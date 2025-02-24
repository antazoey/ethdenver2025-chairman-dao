# pragma version ~=0.4.0

# The number of signatures needed to call disperseAwards()
required_signers: public(uint256)

#  Tallied award points to divy out to employees.
awardPoints: public(HashMap[address, uint256])

# (optional?) Every employee's total award points
totalAwardsPoints: public(HashMap[address, uint256])

@deploy
def __init__(required_signers: uint256):
    self.required_signers = required_signers


@external
def disperseAwards(calldata: Bytes[2000], amount: uint256):
    # Go through and divy out the awards.
    pass



