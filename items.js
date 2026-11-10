export const items = [
    {
        "name": "Town Portal Scroll",
        "purpose": "Mobility",
        "image": "images/item-icons/town-portal-scroll.png",
        "summary": "Carry a scroll to reinforce a lane or return to base.",
        "cost": 100,
        "properties": {
            "Ability": "Channeled",
            "Affects": "Allies"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Teleport",
                "metrics": {
                    "Mana": 75,
                    "Cooldown": "80 s"
                },
                "text": [
                    "After channeling for 3 seconds, teleports you to a target friendly building.",
                    "Double-click to teleport to your team's base fountain."
                ]
            }
        ],
        "lore": "What a hero truly needs."
    },
    {
        "name": "Clarity",
        "purpose": "Recovery",
        "image": "images/item-icons/clarity.png",
        "summary": "Recover mana between fights while you can avoid enemy attacks.",
        "cost": 60,
        "properties": {
            "Ability": "Unit Target",
            "Affects": "Allied Heroes",
            "Dispellable": "Yes"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Replenish",
                "metrics": {
                    "Range": 250
                },
                "text": [
                    "Grants 6 mana regeneration to the target for 25 seconds.",
                    "If the unit is attacked by an enemy hero or Roshan, the effect is lost."
                ]
            }
        ],
        "lore": "Clear water that enhances the ability to meditate."
    },
    {
        "name": "Faerie Fire",
        "purpose": "Recovery",
        "image": "images/item-icons/faerie-fire.jpg",
        "summary": "Carry a Faerie Fire for a burst of healing during an early trade.",
        "cost": 65,
        "properties": {
            "Ability": "No Target",
            "Affects": "Allied Heroes"
        },
        "stats": [
            "+2 Damage"
        ],
        "abilities": [
            {
                "type": "Use",
                "name": "Imbue",
                "metrics": {
                    "Cooldown": "5 s"
                },
                "text": [
                    "Instantly restores 85 health."
                ]
            }
        ],
        "lore": "The ethereal flames from the ever-burning ruins of Kindertree ignite across realities."
    },
    {
        "name": "Smoke of Deceit",
        "purpose": "Utility",
        "image": "images/item-icons/smoke-of-deceit.png",
        "summary": "Move your team together for a surprise attack.",
        "cost": 50,
        "properties": {
            "Ability": "No Target"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Disguise",
                "metrics": {
                    "Radius": 1200,
                    "Cooldown": "1 s"
                },
                "text": [
                    "Turns the caster and all allied player-controlled targets in a 1200 radius invisible, and grants 15% bonus movement speed for 45 seconds.",
                    "While the caster is still disguised, any allies that come within 300 range of them will also get the buff applied to them. Each smoke can only be applied once to allies.",
                    "Attacking or moving within 1025 range of an enemy hero or tower will break the invisibility.",
                    "Disguise grants invisibility that is immune to True Sight.",
                    "Smoke of Deceit is usable from the backpack and has no cooldown when swapped into the main inventory."
                ]
            }
        ],
        "lore": "The charlatan wizard Myrddin's only true contribution to the arcane arts."
    },
    {
        "name": "Observer Ward",
        "purpose": "Vision",
        "image": "images/item-icons/observer-ward.png",
        "summary": "Watch an approach to a lane or objective before enemies arrive.",
        "properties": {
            "Ability": "Point Target",
            "Affects": "Allied Heroes"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Plant",
                "metrics": {
                    "Range": 500,
                    "Cooldown": "1 s"
                },
                "text": [
                    "Plants an Observer Ward, an invisible watcher that gives ground vision in a 1600 radius to your team. Lasts 6 minutes.",
                    "Hold Control to give one Observer Ward to an allied hero."
                ]
            }
        ],
        "lore": "A form of half-sentient plant, often cultivated by apprentice wizards."
    },
    {
        "name": "Sentry Ward",
        "purpose": "Vision",
        "image": "images/item-icons/sentry-ward.png",
        "summary": "Reveal hidden wards where your team already has vision.",
        "cost": 50,
        "properties": {
            "Ability": "Point Target",
            "Affects": "Allied Heroes"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Plant",
                "metrics": {
                    "Range": 500,
                    "Cooldown": "1 s"
                },
                "text": [
                    "Plants a Sentry Ward, an invisible watcher that grants True Sight, the ability to see invisible enemy units and wards, to any existing allied vision within a 1050 radius. Lasts 7 minutes.",
                    "Does not grant ground vision.",
                    "Hold Control to give one Sentry Ward to an allied hero."
                ]
            }
        ],
        "lore": "A form of plant originally grown in the garden of a fearful king."
    },
    {
        "name": "Enchanted Mango",
        "purpose": "Recovery",
        "image": "images/item-icons/enchanted-mango.png",
        "summary": "Keep enough mana on hand for one more spell.",
        "cost": 65,
        "properties": {
            "Ability": "No Target",
            "Affects": "Allied Heroes"
        },
        "stats": [
            "+0.4 Health Regeneration"
        ],
        "abilities": [
            {
                "type": "Use",
                "name": "Eat Mango",
                "metrics": {
                    "Range": 400
                },
                "text": [
                    "Instantly restores 100 mana."
                ]
            }
        ],
        "lore": "The bittersweet flavors of Jidi Isle are irresistible to amphibians."
    },
    {
        "name": "Healing Salve",
        "purpose": "Recovery",
        "image": "images/item-icons/healing-salve.png",
        "summary": "Heal up between fights when you can avoid incoming attacks.",
        "cost": 100,
        "properties": {
            "Ability": "Unit Target",
            "Affects": "Allied Heroes",
            "Dispellable": "Yes"
        },
        "abilities": [
            {
                "type": "Use",
                "name": "Salve",
                "metrics": {
                    "Range": 250
                },
                "text": [
                    "Grants 30 health regeneration to the target for 13 seconds.",
                    "If the unit is attacked by an enemy hero or Roshan, the effect is lost.",
                    "Heals for half the amount per second when cast on an ally."
                ]
            }
        ],
        "lore": "A magical salve that can quickly mend even the deepest of wounds."
    },
    {
        "name": "Tango",
        "purpose": "Recovery",
        "image": "images/item-icons/tango.jpg",
        "summary": "Bring Tangos to recover between trades without leaving your lane.",
        "cost": 90,
        "abilities": [
            {
                "type": "Use",
                "name": "Devour",
                "text": [
                    "Consumes a target tree to gain 7 health regeneration for 16 seconds. Consuming an Ironwood Tree doubles the heal amount.",
                    "Cast Range: 165"
                ]
            }
        ],
        "lore": "Forage to survive on the battlefield."
    },
    {
        "name": "Bloodthorn",
        "purpose": "Damage",
        "image": "images/item-icons/bloodthorn.jpg",
        "summary": "Choose Bloodthorn when your team can focus attacks on a silenced target.",
        "cost": 6800,
        "stats": [
            "+20 Intelligence",
            "+60 Attack Speed",
            "+50 Damage",
            "+5 Mana Regeneration",
            "+20 Magic Resistance"
        ],
        "abilities": [
            {
                "type": "Active",
                "name": "Soul Rend",
                "text": [
                    "Silences a target for 5 seconds. At the end of the silence, an additional 30% of all damage taken during the silence will be dealt to the target as magical damage.",
                    "All attacks on the silenced target will have True Strike and 100% chance to critically strike for 130% damage.",
                    "Range: 900"
                ]
            },
            {
                "type": "Passive",
                "name": "Mage Slayer",
                "text": [
                    "Places a debuff when you attack enemies, causing them to do 35% less spell damage for 6 seconds."
                ]
            }
        ],
        "lore": "A reviled blade that bites deeper with each wriggle of its victim's final throes."
    },
    {
        "name": "Black King Bar",
        "purpose": "Defense",
        "image": "images/item-icons/black_king_bar.jpg",
        "summary": "Activate Black King Bar before committing to a fight against enemy disables.",
        "cost": 4050,
        "stats": [
            "+10 Strength",
            "+24 Attack Damage"
        ],
        "abilities": [
            {
                "type": "Active",
                "name": "Avatar",
                "text": [
                    "Applies a Basic Dispel. Grants 60% Magic resistance and immunity to pure and reflected damage. For the duration of the effect, any negative effect from enemy spells has no effect.",
                    "Duration: 9/8/7/6",
                    "Dispel Type: Basic Dispel"
                ]
            }
        ],
        "lore": "A powerful staff imbued with the strength of giants."
    },
    {
        "name": "Blink Dagger",
        "purpose": "Mobility",
        "image": "images/item-icons/blink_dagger.png",
        "summary": "Use Blink Dagger to close the gap before an initiation spell.",
        "cost": 2250,
        "abilities": [
            {
                "type": "Active",
                "name": "Blink",
                "text": [
                    "Teleport to a target point up to 1200 units away.",
                    "Blink Dagger cannot be used for 3 seconds after taking damage from an enemy hero or Roshan."
                ]
            }
        ],
        "lore": "The fabled dagger used by the fastest assassin ever to walk the lands."
    },
    {
        "name": "Monkey King Bar",
        "purpose": "Damage",
        "image": "images/item-icons/Monkey_King_Bar.jpg",
        "summary": "Consider Monkey King Bar when evasion makes your attacks miss.",
        "cost": 4700,
        "stats": [
            "+40 Attack Damage",
            "+45 Attack Speed"
        ],
        "abilities": [
            {
                "type": "Passive",
                "name": "Pierce",
                "text": [
                    "Grants each attack an 80% chance to pierce through evasion and deal 70 bonus magical damage."
                ]
            }
        ],
        "lore": "A powerful staff used by a master warrior."
    },
    {
        "name": "Magic Stick",
        "purpose": "Recovery",
        "image": "images/item-icons/stick.jpg",
        "summary": "Pick up a Magic Stick in a lane where opponents cast spells frequently.",
        "abilities": [
            {
                "type": "Active",
                "name": "Energy Charge",
                "text": [
                    "Nearby enemy spell casts can build charges. Activate the stick to spend its charges and restore health and mana."
                ]
            }
        ]
    }
];
