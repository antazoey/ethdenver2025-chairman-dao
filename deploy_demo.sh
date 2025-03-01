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
        record { principal \"${BOB}\"; record { health = 6; spirit = 3 } }; \
      }; estimated_health = 8; estimated_spirit = 4 }; \
      record { id = 1; title = \"New TikTok marketing videos\"; description = \"Over the weekend, I made TikToks about our brand.\"; state = variant { Pending }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 1; estimated_spirit = 3  }; \
      record { id = 2; title = \"Landed a large electronic-order sale\"; description = \"So many events! A huge Ethereum convention is coming to town and needs coffee pronto.\"; state = variant { Pending }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 5; estimated_spirit = 2  }; \
      record { id = 3; title = \"Fix the water heater\"; description = \"We will have hot water again!\"; state = variant { Open }; voting_power = record { health = 4; spirit = 7 }; claims = vec {\
        record { account = principal \"${ALICE}\"; percentage = 0.0 }; \
        record { account = principal \"${BOB}\"; percentage = 0.0 }; \
      }; notes = vec {}; ratings = vec {}; estimated_health = 4; estimated_spirit = 7  }; \
      record { id = 4; title = \"Selling coffee\"; description = \"This is what we live for\"; state = variant { Open }; voting_power = record { health = 10; spirit = 1 }; claims = vec {}; notes = vec {}; ratings = vec {}; estimated_health = 10; estimated_spirit = 1  }; \
      record { id = 5; title = \"Closing :(\"; description = \"We all hate it!! claim this task if you're closing this week\"; state = variant { Open }; voting_power = record { health = 2; spirit = 10 }; claims = vec {\
        record { account = principal \"${BOB}\"; percentage = 0.0 }; \
      }; notes = vec {}; ratings = vec {}; estimated_health = 2; estimated_spirit = 10  }; \
      record { id = 6; title = \"Product Sourcing\"; description = \"We gotta stay up to date on these beans\"; state = variant { Open }; voting_power = record { health = 4; spirit = 2 }; claims = vec {\
        record { account = principal \"${ALICE}\"; percentage = 0.0 }; \
        record { account = principal \"${BOB}\"; percentage = 0.0 }; \
        record { account = principal \"${CHRIS}\"; percentage = 0.0 }; \
      }; notes = vec {}; ratings = vec {}; estimated_health = 4; estimated_spirit = 2  }; \
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
