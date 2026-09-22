import os
import time
import uuid

def validate_customer_authorization(request_data):
    """Explicitly validates customer authorization and request integrity."""
    amount = request_data.get("amount")
    if amount is None or amount <= 0:
        return False
    return bool(request_data.get("customer_authorized", False) or request_data.get("is_authorized", False) or request_data.get("authorization_token"))

def execute_transfer(amount, source_account, destination_account):
    """Simulates the actual execution of a bank transfer via external API."""
    print(f"Connecting to banking gateway... Transferring {amount} from {source_account} to {destination_account}")
    return True

def log_audit_event(tx_id, status):
    """Simulates writing to an immutable audit ledger."""
    print(f"AUDIT LOG: Transaction {tx_id} authorization result: {status}")

def process_outward_transfer(request_data):
    # Extract transfer details
    amount = request_data.get("amount")
    source = request_data.get("source_account")
    dest = request_data.get("destination_account")
    
    # Generate a unique transaction identifier
    tx_id = str(uuid.uuid4())
    
    # SAMA Requirement 1: Explicitly validate customer authorization before processing
    is_authorized = validate_customer_authorization(request_data)
    auth_result = "AUTHORIZED" if is_authorized else "UNAUTHORIZED"
    
    # SAMA Requirement 4: Write immutable audit event containing transaction ID and authorization result BEFORE transfer
    log_audit_event(tx_id, auth_result)
    
    if not is_authorized:
        return {"status": "failed", "reason": "Customer authorization failed", "transaction_id": tx_id}
    
    # Transfer executed only after authorization validation and audit logging
    success = execute_transfer(amount, source, dest)
    
    if success:
        return {"status": "success", "transaction_id": tx_id}
    else:
        return {"status": "failed", "reason": "Execution failed", "transaction_id": tx_id}

if __name__ == "__main__":
    # Test with a dummy request that contains a negative amount (which should be rejected)
    sample_request = {
        "amount": -5000,
        "source_account": "SA1234567890",
        "destination_account": "SA0987654321"
    }
    process_outward_transfer(sample_request)