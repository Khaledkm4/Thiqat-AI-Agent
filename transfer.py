import os
import time
import uuid

def execute_transfer(amount, source_account, destination_account):
    """Simulates the actual execution of a bank transfer via external API."""
    print(f"Connecting to banking gateway... Transferring {amount} from {source_account} to {destination_account}")
    return True

def log_audit_event(tx_id, status):
    """Simulates writing to an immutable audit ledger."""
    print(f"AUDIT LOG: Transaction {tx_id} completed with status: {status}")

def process_outward_transfer(request_data):
    # Extract transfer details
    amount = request_data.get("amount")
    source = request_data.get("source_account")
    dest = request_data.get("destination_account")
    
    # Generate a unique transaction identifier
    tx_id = str(uuid.uuid4())
    
    # ⚠️ SAMA Violation 1 & 2: Executing transfer without checking if amount > 0 
    # and without explicit customer authorization validation.
    
    # ⚠️ SAMA Violation 3: Executing the transfer BEFORE writing the immutable audit event!
    success = execute_transfer(amount, source, dest)
    
    if success:
        # Logging happens AFTER execution - Strict SAMA Violation!
        log_audit_event(tx_id, "SUCCESS")
        return {"status": "success", "transaction_id": tx_id}
    else:
        log_audit_event(tx_id, "FAILED")
        return {"status": "failed"}

if __name__ == "__main__":
    # Test with a dummy request that contains a negative amount (which should be rejected)
    sample_request = {
        "amount": -5000,
        "source_account": "SA1234567890",
        "destination_account": "SA0987654321"
    }
    process_outward_transfer(sample_request)
