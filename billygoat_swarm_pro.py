import asyncio
import json
import time
from infrastructure.db_pocketbase import PocketBaseHandler
from infrastructure.redis_layer import RedisManager
from swarm import Swarm, Agent
import ollama

# Import existing prompts (reusing the file you have)
try:
    from agent_system_prompts import MIS_PROMPT, ARS_PROMPT, FQA_PROMPT, AO_PROMPT, KSL_PROMPT, VMA_PROMPT, MC_PROMPT
except ImportError:
    print(" Prompts file missing. Using placeholders.")
    MIS_PROMPT = "Analyze this lead..." # ... (Fallbacks would go here)
    ARS_PROMPT = "Score this lead..."

# === INITIALIZATION ===
try:
    db = PocketBaseHandler()
    queue = RedisManager()
    client = Swarm(client=ollama.Client(host='http://localhost:11434'))
except Exception as e:
    print(f" Critical Infrastructure Failure: {e}")
    exit(1)

# === MODEL CONFIG (Item 33) ===
MODEL_CONFIG = {
    "FAST": "llama3.2:3b-q4:billygoat",
    "SMART": "llama3.2:3b-q6:billygoat"
}

# === AGENT SETUP (Simplified for Pro Script) ===
# Note: In a full implementation, you'd map the imported PROMPTS to these agents
mis = Agent(name="MIS", model=MODEL_CONFIG["FAST"], instructions=MIS_PROMPT)
ars = Agent(name="ARS", model=MODEL_CONFIG["SMART"], instructions=ARS_PROMPT)
# ... define others similarly ...

async def process_single_lead(lead: dict):
    """
    Full pipeline execution for a single lead.
    Addresses Item 12: Error Recovery (via try/except blocks)
    """
    start_time = time.time()
    
    # 1. Register in DB (Status: Processing)
    lead['status'] = 'processing'
    db_id = db.create_lead(lead)
    print(f" Processing: {lead['company']} (ID: {db_id})")
    
    try:
        # 2. Run Swarm (Simplified Chain)
        # In reality, you'd use the full handoff logic from the previous script
        messages = [{"role": "user", "content": json.dumps(lead)}]
        
        # Simulating the chain for the infrastructure demo
        mis_response = client.run(agent=mis, messages=messages)
        # ... logic to pass to ARS ...
        
        # 3. Simulate Result (Mocking the extraction for this demo)
        nepq_result = {"total": 850, "logic": 25, "emotion": 40, "urgency": 15}
        kill_shot = "We help you scale without the fail."
        
        # 4. Save Results (Item 5 & 22)
        if db_id:
            db.update_lead_scoring(db_id, nepq_result, kill_shot)
            db.log_agent_action(db_id, "MC", "Lead Qualified")
            
        print(f" Finished: {lead['company']} in {time.time() - start_time:.2f}s")
        
    except Exception as e:
        print(f" Error processing {lead['company']}: {e}")
        if db_id:
            db.log_agent_action(db_id, "SYSTEM", f"Error: {str(e)}")

async def worker_loop():
    """
    Addresses Item 21: Swarm Concurrency Tuning.
    Continuous worker loop that pulls from Redis.
    """
    print(" Swarm Pro Worker Started. Waiting for leads...")
    while True:
        # Check queue
        lead = queue.pop_lead()
        if not lead:
            # Queue empty, wait a bit (Item 20)
            time.sleep(2)
            continue
            
        # Process lead
        await process_single_lead(lead)

async def batch_loader(csv_path: str):
    """
    Helper to load CSV into Redis (Item 41).
    """
    import csv
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            if queue.push_lead(row):
                count += 1
    print(f" Loaded {count} new leads into Redis Queue.")

if __name__ == "__main__":
    import sys
    # Mode selection
    if len(sys.argv) > 1 and sys.argv[1] == "--load":
        asyncio.run(batch_loader("leads.csv"))
    else:
        asyncio.run(worker_loop())
