# Fix Network ACL - Step by Step Guide

Your security group is correct, but GitHub Actions still can't connect. This is **99% likely a Network ACL issue**.

## Quick Fix (5 minutes)

### Step 1: Find Your Network ACL

1. Go to **AWS Console** → **EC2** → **Instances**
2. Click on your instance (IP: 35.75.14.169)
3. Click the **Networking** tab
4. Find **Subnet ID** (looks like: `subnet-xxxxxxxxx`)
5. Copy that Subnet ID

### Step 2: Find the Network ACL

1. Go to **AWS Console** → **VPC** → **Subnets**
2. Paste your Subnet ID in the search box
3. Click on your subnet
4. Look at the **Network ACL** field (looks like: `acl-xxxxxxxxx`)
5. Click on the Network ACL ID (it's a link)

### Step 3: Check Inbound Rules

1. You should now be on the Network ACL page
2. Click the **Inbound rules** tab
3. Look for a rule allowing **TCP port 22** from **0.0.0.0/0**

**If you DON'T see a rule allowing port 22 from 0.0.0.0/0:**

### Step 4: Add the Rule

1. Click **Edit inbound rules**
2. Click **Add rule**
3. Fill in:
   - **Rule number:** `100` (or any number lower than any "Deny" rules)
   - **Type:** `Custom TCP`
   - **Protocol:** `TCP (6)` (should auto-fill)
   - **Port range:** `22`
   - **Source:** `0.0.0.0/0`
   - **Description:** `Allow SSH from GitHub Actions`
   - **Allow/Deny:** `Allow` (should be default)
4. Click **Save changes**

### Step 5: Check Outbound Rules (Important!)

1. Click the **Outbound rules** tab
2. Look for a rule allowing ephemeral ports (32768-65535) to 0.0.0.0/0

**If you DON'T see this:**

1. Click **Edit outbound rules**
2. Click **Add rule**
3. Fill in:
   - **Rule number:** `100`
   - **Type:** `Custom TCP`
   - **Protocol:** `TCP (6)`
   - **Port range:** `32768-65535`
   - **Destination:** `0.0.0.0/0`
   - **Description:** `Allow return traffic`
   - **Allow/Deny:** `Allow`
4. Click **Save changes**

### Step 6: Wait and Test

1. Wait 10-30 seconds for changes to propagate
2. Go back to GitHub Actions
3. Re-run your workflow

## Visual Guide

Your Network ACL inbound rules should look like this:

```
Rule # | Type        | Protocol | Port Range | Source    | Allow/Deny
-------|-------------|----------|------------|-----------|-----------
100    | Custom TCP  | TCP (6)  | 22         | 0.0.0.0/0 | Allow
*      | All traffic | All      | All        | 0.0.0.0/0 | Deny
```

The `*` rule is the default deny-all rule (usually rule #32767). Your allow rule must have a **lower number** than the deny rule.

## Why This Happens

- **Security Groups** = Instance-level firewall (you have this correct ✅)
- **Network ACLs** = Subnet-level firewall (this is blocking GitHub Actions ❌)

Network ACLs are evaluated **before** security groups, so even if your security group allows SSH, the Network ACL can block it.

## Still Not Working?

Run the diagnostic script:
```bash
./.github/diagnose-network.sh
```

This will show you exactly what's configured and what needs to be fixed.
