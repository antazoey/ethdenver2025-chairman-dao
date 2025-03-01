#!/bin/bash

set -e

ALICE=$(dfx identity get-principal --identity Alice)
BOB=$(dfx identity get-principal --identity Bob)
CHRIS=$(dfx identity get-principal --identity Chris)


#      record { id = 0; title = \"Upgrade frother\"; description = \"Frother 17A is getting really old. Let's replace it.\"; new_title = null; new_description: null; notes = ""; completion_notes = null; health_only = false; }\
#      record { id = 0; title = \"Give coffee to homeless\"; description = \"We should embrace the community we are in and volunteer at the shelter by providing coffee. This will give us a good local reputation and help out people who need it the most.\"; new_title = null; new_description: null; notes = ""; completion_notes = null; health_only = false; }\
#      record { id = 0; title = \"Expand theatre area\"; description = \"The theatre area of the coffee shop is really small, but I think we can easily do some remodeling to fix that.\"; new_title = null; new_description: null; notes = ""; completion_notes = null; health_only = false; }\

ARGUMENTS="(record { \
    accounts = vec {\
      record { owner = principal \"${ALICE}\"; voting_power = record { health = 5; spirit = 10 }; payouts = vec {}; }; \
      record { owner = principal \"${BOB}\"; voting_power = record { health = 15; spirit = 20 }; payouts = vec {}; }; \
      record { owner = principal \"${CHRIS}\"; voting_power = record { health = 25; spirit = 30 }; payouts = vec {}; }; \
    }; \
    tasks = vec {\
      record { id = 0; title = \"Upsold event sales\"; description = \"I upsold a few tickets to an upcoming show in the coffee shop, increasing revenue.\"; state = variant { Open }; voting_power = record { health = 10; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; }; \
      record { id = 1; title = \"New TikTok marketing videos\"; description = \"Over the weekend, I made TikToks about our brand.\"; state = variant { Open }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; }; \
      record { id = 2; title = \"Handled large electronic-order sale\"; description = \"I helped our largest customer supply coffee to 'ETHDenver'.\"; state = variant { Open }; voting_power = record { health = 0; spirit = 0 }; claims = vec {}; notes = vec {}; ratings = vec {}; }; \
    }; \
    proposals = vec {\
      record { id = 0; title = \"Upgrade frother\"; description = \"Frother 17A is getting really old. Let's replace it.\"; state = variant { Open }; notes = \"It will code a thousand sand\"; health_only = false } \
    } \
  }\
)"

dfx deploy chairman_dao --argument "${ARGUMENTS}" --yes
