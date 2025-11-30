import redis
import json
import numpy as np
from typing import Dict, List, Tuple

# === CONFIGURATION ===
REDIS_HOST = "localhost"
REDIS_PORT = 6379

class NeuralLoadBalancer:
    """
    Item 152: Predictive Swarm Load Balancer.
    Routes leads to the specific Agent instance (GPU) that has the 
    highest probability of handling the token load efficiently.
    """
    def __init__(self):
        try:
            self.r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
            print("⚖️  Neural Load Balancer Online")
        except:
            print("❌ Redis Connection Failed")

    def predict_complexity(self, lead: Dict) -> float:
        """
        Uses heuristics to guess token cost.
        Future: Use a small 100M parameter model here.
        """
        score = 1.0
        # Larger companies = more data to parse
        if int(lead.get('employees', 0) or 0) > 1000: score += 0.5
        # Executive titles = harder NEPQ reasoning
        if "CEO" in lead.get('title', ''): score += 0.3
        return score

    def get_optimal_agent_slot(self, lead_complexity: float) -> str:
        """
        Selects the best available 'Shard' (Agent Instance).
        """
        # Fetch current loads from Redis (updated by agent heartbeats)
        shards = self.r.hgetall("swarm_health:gpu_loads") # e.g. {"shard_01": "45", "shard_02": "80"}
        
        best_shard = None
        min_load = 101.0
        
        for shard_id, load_str in shards.items():
            current_load = float(load_str)
            # Predictive adjustment: If lead is complex, avoid shards > 60% load
            predicted_impact = lead_complexity * 10.0 # Arbitrary weight
            
            if (current_load + predicted_impact) < 95.0:
                if current_load < min_load:
                    min_load = current_load
                    best_shard = shard_id
        
        return best_shard or "overflow_queue"

    def route_lead(self, lead: Dict):
        complexity = self.predict_complexity(lead)
        target_shard = self.get_optimal_agent_slot(complexity)
        
        print(f"⚖️  Routing Lead '{lead['company']}' (Complexity: {complexity:.1f}) -> {target_shard}")
        
        # Push to specific shard queue
        self.r.rpush(f"queue:{target_shard}", json.dumps(lead))
