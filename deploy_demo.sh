#!/bin/bash

set -e

ALICE=$(dfx identity get-principal --identity Alice)
BOB=$(dfx identity get-principal --identity Bob)
CHRIS=$(dfx identity get-principal --identity Chris)


ARGUMENTS="(record { \
    accounts = vec {\
      record { owner = principal \"${ALICE}\"; voting_power = record { health = 5; spirit = 10 }; payouts = vec {}; }; \
      record { owner = principal \"${BOB}\"; voting_power = record { health = 15; spirit = 20 }; payouts = vec {}; }; \
      record { owner = principal \"${CHRIS}\"; voting_power = record { health = 25; spirit = 30 }; payouts = vec {}; }; \
    }; \
    tasks = vec {\
      record { id = 0; title = \"Storms Abrewin' Folk Night\"; description = \"I upsold a few tickets to an upcoming show in the coffee shop, increasing revenue.\"; state = variant { Pending }; voting_power = record { health = 10; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {\
        record { principal \"${ALICE}\"; record { health = 8; spirit = 4 } }; \
      }; estimated_health = 8; estimated_spirit = 4 }; \
      record { id = 1; title = \"New TikTok marketing videos\"; description = \"Over the weekend, I made TikToks about our brand.\"; state = variant { Pending }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 8; estimated_spirit = 4  }; \
      record { id = 2; title = \"Handled large electronic-order sale\"; description = \"I helped our largest customer supply coffee to ETHDenver.\"; state = variant { Pending }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 8; estimated_spirit = 4  }; \
      record { id = 3; title = \"Fixed the water heater\"; description = \"We have hot water again!\"; state = variant { Open }; voting_power = record { health = 10; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 8; estimated_spirit = 4  }; \
      record { id = 4; title = \"Singing happy birthday\"; description = \"Anyone who sang happy birthday this week should claim this task\"; state = variant { Open }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 8; estimated_spirit = 4  }; \
      record { id = 5; title = \"Game night\"; description = \"This task is for those who contributed to game night\"; state = variant { Open }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 8; estimated_spirit = 4  }; \
    }; \
    proposals = vec {\
      record { id = 5; title = \"Upgrade frother\"; description = \"Frother 17A is getting really old. We should replace it.\"; state = variant { Open }; notes = \"It will code a thousand sand\"; health_only = false }; \
      record { id = 4; title = \"Replace floor-mats\"; description = \"It hurts the baristas feet to stand all day without floor mats\"; state = variant { Open }; notes = \"We must keep baristas happy to keep making money\"; health_only = true }; \
      record { id = 3; title = \"Buy a food-truck\"; description = \"A food truck extension would greatly increase sales.\"; state = variant { Open }; notes = \"the food truck should pay for itself\"; health_only = false }; \
      record { id = 2; title = \"Outdoor patio\"; description = \"We should have an outdoor patio for the business\"; state = variant { Accepted }; notes = \"It will code a thousand sand\"; health_only = false }; \
      record { id = 1; title = \"Health insurance\"; description = \"Let us offer health insurance to DAO members\"; state = variant { Rejected }; notes = \"It will be high cost for the insurance\"; health_only = false; }; \
      record { id = 0; title = \"Mascot\"; description = \"A dog should be our company mascot\"; state = variant { Accepted }; notes = \"It will be mid-cost hiring an artist for the mascot\"; health_only = false }; \
    } \
  }\
)"

dfx deploy chairman_dao --argument "${ARGUMENTS}" --yes
dfx deploy internet_identity
