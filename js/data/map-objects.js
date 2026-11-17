// Everything that is drawn on the map (map.html).
// x and y are percentages of the map image: x from the left edge, y from the top edge.
// Tip: hold Shift and click the map on the page to read the coordinates of any point.

// One entry per kind of marker: its layer, legend label, icon and description.
// "direIcon" is used instead of "icon" for objects with side: "dire".
export const objectTypes = {
    barracksMelee: {
        layer: "buildings", label: "Melee barracks",
        icon: "images/map/barracks-melee-radiant.png", direIcon: "images/map/barracks-melee-dire.png",
        text: "Melee barracks. Every lane has one melee and one ranged barracks behind the tier 3 tower. If the enemy destroys it, they get stronger melee creeps in this lane."
    },
    barracksRanged: {
        layer: "buildings", label: "Ranged barracks",
        icon: "images/map/barracks-ranged-radiant.png", direIcon: "images/map/barracks-ranged-dire.png",
        text: "Ranged barracks. If the enemy destroys it, they get stronger ranged creeps in this lane. When all six barracks of a team fall, the enemy gets mega creeps."
    },
    building: {
        layer: "buildings", label: "Base building",
        icon: "images/map/building-radiant.png", direIcon: "images/map/building-dire.png",
        text: "A building inside the base. It does not attack, but destroying it gives gold to the enemy team."
    },
    tormentor: {
        layer: "roshan", label: "Tormentor", icon: "images/map/tormentor-radiant.png",
        text: "The Tormentor is a neutral object that reflects damage back to the heroes who attack it. The team that kills it gets an Aghanim's Shard. During the day it is in the bottom corner, at night in the top corner."
    },
    tower: {
        layer: "buildings", label: "Tower", icon: "images/map/tower.png",
        text: "Towers guard each lane. They must be destroyed in order, from tier 1 at the river to tier 4 beside the Ancient."
    },
    ancient: {
        layer: "buildings", label: "Ancient", icon: "images/map/ancient.png",
        text: "The Ancient is the heart of the base. The team that destroys the enemy Ancient wins the match."
    },
    outpost: {
        layer: "buildings", label: "Outpost", icon: "images/map/outpost.png",
        text: "A captured outpost gives vision of the area and can be used as a teleport destination."
    },
    fountain: {
        layer: "buildings", label: "Fountain", icon: "images/map/fountain-radiant.png",
        text: "The fountain is where heroes start the match and come back to life. It quickly restores health and mana, and the shop is next to it."
    },
    gate: {
        layer: "objects", label: "Twin Gate", icon: "images/map/gate-radiant.png",
        text: "Twin Gates stand in two opposite corners of the map. Channel at one gate to travel to the other one: a quick way to cross the map."
    },
    lotus: {
        layer: "objects", label: "Lotus Pool", icon: "images/map/lotus-pool.png",
        text: "Healing Lotuses grow in this pool. The first one appears at 3:00, then a new one is added every 3 minutes. A hero can pick them up to restore health and mana."
    },
    watcher: {
        layer: "buildings", label: "Watcher", icon: "images/map/watcher.png",
        text: "A watcher gives vision to the team that activates it. Take the ones on your side before a fight."
    },
    campSmall: {
        layer: "camps", label: "Small camp", icon: "images/map/camp-small.png",
        text: "Small neutral camp: weak creeps that a support can stack or pull into the lane."
    },
    campMedium: {
        layer: "camps", label: "Medium camp", icon: "images/map/camp-medium.png",
        text: "Medium neutral camp: steady gold for a carry in the early game."
    },
    campLarge: {
        layer: "camps", label: "Large camp", icon: "images/map/camp-large.png",
        text: "Large neutral camp: stronger creeps and more gold. Good for stacking."
    },
    campAncient: {
        layer: "camps", label: "Ancient camp", icon: "images/map/camp-ancient.png",
        text: "Ancient neutral camp: the strongest creeps on the map and the biggest reward."
    },
    campFlooded: {
        layer: "camps", label: "Flooded camp", icon: "images/map/camp-small.png",
        text: "Flooded camp: a neutral camp beside the water streams (added in patch 7.38). Every five minutes one of its creeps is upgraded to a stronger one for the rest of the match, so the camp grows over time. If the camp is blocked, it does not upgrade."
    },
    bounty: {
        layer: "runes", label: "Bounty rune", icon: "images/map/rune-bounty.webp",
        text: "Bounty runes give gold to the whole team. At 0:00 they appear at the two river rune spots, only once. From 3:00 they appear here every 3 minutes."
    },
    river: {
        layer: "runes", label: "River rune", icon: "images/map/rune-water.webp",
        text: "River rune spot. Bounty runes appear here once at 0:00, water runes at 2:00 and 4:00. From 6:00 a power rune appears every 2 minutes at the top or the bottom spot: the game picks the spot at random, so watch both."
    },
    wisdom: {
        layer: "runes", label: "Wisdom rune", icon: "images/map/rune-wisdom.webp",
        text: "Wisdom runes give bonus experience. They appear every 7 minutes."
    },
    roshan: {
        layer: "roshan", label: "Roshan", icon: "images/map/roshan.png",
        text: "Roshan is the strongest neutral creep and drops the Aegis of the Immortal. He stays in the top pit during the day and moves to the bottom pit at night."
    },
    lane: {
        layer: "lanes", label: "Lane",
        text: ""
    }
};

// Legend order and names of the layers that can be switched on and off.
export const layers = [
    { id: "buildings", label: "Buildings" },
    { id: "objects", label: "Gates and Lotus" },
    { id: "camps", label: "Neutral camps" },
    { id: "runes", label: "Runes" },
    { id: "roshan", label: "Roshan and Tormentor" },
    { id: "lanes", label: "Lanes" }
];

// The two Roshan pits.
export const roshanPits = {
    top: { x: 32.8, y: 40.7 },
    bottom: { x: 62.8, y: 67.6 }
};

// The two Tormentor spots: top at night, bottom during the day.
export const tormentorSpots = {
    top: { x: 11.2, y: 9.6, icon: "images/map/tormentor-dire.png" },
    bottom: { x: 87.1, y: 95.7, icon: "images/map/tormentor-radiant.png" }
};

// Power runes that can appear in the river from 6:00.
export const powerRunes = [
    { name: "Amplify Damage", icon: "images/map/rune-amplify.webp" },
    { name: "Arcane", icon: "images/map/rune-arcane.webp" },
    { name: "Haste", icon: "images/map/rune-haste.webp" },
    { name: "Illusion", icon: "images/map/rune-illusion.webp" },
    { name: "Invisibility", icon: "images/map/rune-invisibility.webp" },
    { name: "Regeneration", icon: "images/map/rune-regeneration.webp" },
    { name: "Shield", icon: "images/map/rune-shield.webp" }
];

// Icon of the flooded camp: it looks bigger as more of its creeps are upgraded.
// One creep is upgraded every 5 minutes; the minutes for the icons are only a visual guide.
export const floodedCampStages = [
    { from: 1, size: "small", icon: "images/map/camp-small.png" },
    { from: 10, size: "medium", icon: "images/map/camp-medium.png" },
    { from: 20, size: "large", icon: "images/map/camp-large.png" },
    { from: 30, size: "ancient", icon: "images/map/camp-ancient.png" }
];

export const mapObjects = [
    // Dire towers
    { type: "tower", side: "dire", name: "Dire top tower, tier 1", x: 21.3, y: 20.3 },
    { type: "tower", side: "dire", name: "Dire top tower, tier 2", x: 47.7, y: 20.2 },
    { type: "tower", side: "dire", name: "Dire top tower, tier 3", x: 66.5, y: 21.2 },
    { type: "tower", side: "dire", name: "Dire mid tower, tier 1", x: 51.3, y: 49.2 },
    { type: "tower", side: "dire", name: "Dire mid tower, tier 2", x: 61.0, y: 41.0 },
    { type: "tower", side: "dire", name: "Dire mid tower, tier 3", x: 70.0, y: 32.3 },
    { type: "tower", side: "dire", name: "Dire bottom tower, tier 1", x: 80.1, y: 64.8 },
    { type: "tower", side: "dire", name: "Dire bottom tower, tier 2", x: 80.5, y: 50.9 },
    { type: "tower", side: "dire", name: "Dire bottom tower, tier 3", x: 80.6, y: 36.2 },
    { type: "tower", side: "dire", name: "Dire tier 4 tower", x: 73.4, y: 27.6 },
    { type: "tower", side: "dire", name: "Dire tier 4 tower", x: 75.9, y: 29.6 },
    // Radiant towers
    { type: "tower", side: "radiant", name: "Radiant top tower, tier 1", x: 16.3, y: 43.0 },
    { type: "tower", side: "radiant", name: "Radiant top tower, tier 2", x: 15.3, y: 58.2 },
    { type: "tower", side: "radiant", name: "Radiant mid tower, tier 1", x: 40.5, y: 60.5 },
    { type: "tower", side: "radiant", name: "Radiant mid tower, tier 2", x: 31.9, y: 69.2 },
    { type: "tower", side: "radiant", name: "Radiant mid tower, tier 3", x: 24.7, y: 75.1 },
    { type: "tower", side: "radiant", name: "Radiant top tower, tier 3", x: 14.5, y: 71.8 },
    { type: "tower", side: "radiant", name: "Radiant bottom tower, tier 3", x: 28.3, y: 86.6 },
    { type: "tower", side: "radiant", name: "Radiant bottom tower, tier 1", x: 73.3, y: 85.9 },
    { type: "tower", side: "radiant", name: "Radiant bottom tower, tier 2", x: 46.5, y: 86.8 },
    { type: "tower", side: "radiant", name: "Radiant tier 4 tower", x: 20.4, y: 78.4 },
    { type: "tower", side: "radiant", name: "Radiant tier 4 tower", x: 22.2, y: 81.2 },

    // Barracks
    { type: "barracksMelee", side: "dire", name: "Dire melee barracks", x: 72.8, y: 32.9 },
    { type: "barracksMelee", side: "dire", name: "Dire melee barracks", x: 82.9, y: 35.0 },
    { type: "barracksMelee", side: "dire", name: "Dire melee barracks", x: 68.5, y: 23.5 },
    { type: "barracksRanged", side: "dire", name: "Dire ranged barracks", x: 68.5, y: 19.7 },
    { type: "barracksRanged", side: "dire", name: "Dire ranged barracks", x: 70.5, y: 30.0 },
    { type: "barracksRanged", side: "dire", name: "Dire ranged barracks", x: 79.2, y: 35.0 },
    { type: "barracksMelee", side: "radiant", name: "Radiant melee barracks", x: 26.5, y: 87.8 },
    { type: "barracksMelee", side: "radiant", name: "Radiant melee barracks", x: 15.9, y: 73.8 },
    { type: "barracksMelee", side: "radiant", name: "Radiant melee barracks", x: 24.5, y: 78.0 },
    { type: "barracksRanged", side: "radiant", name: "Radiant ranged barracks", x: 13.3, y: 73.8 },
    { type: "barracksRanged", side: "radiant", name: "Radiant ranged barracks", x: 22.3, y: 76.2 },
    { type: "barracksRanged", side: "radiant", name: "Radiant ranged barracks", x: 26.5, y: 85.2 },

    // Other buildings inside the bases
    { type: "building", side: "radiant", name: "Radiant building", x: 14.7, y: 76.4 },
    { type: "building", side: "radiant", name: "Radiant building", x: 18.5, y: 76.7 },
    { type: "building", side: "radiant", name: "Radiant building", x: 19.7, y: 73.8 },
    { type: "building", side: "radiant", name: "Radiant building", x: 23.9, y: 81.9 },
    { type: "building", side: "radiant", name: "Radiant building", x: 26.5, y: 81.4 },
    { type: "building", side: "radiant", name: "Radiant building", x: 24.0, y: 86.3 },
    { type: "building", side: "dire", name: "Dire building", x: 71.2, y: 21.7 },
    { type: "building", side: "dire", name: "Dire building", x: 71.5, y: 25.7 },
    { type: "building", side: "dire", name: "Dire building", x: 68.0, y: 27.4 },
    { type: "building", side: "dire", name: "Dire building", x: 76.9, y: 31.6 },
    { type: "building", side: "dire", name: "Dire building", x: 81.2, y: 32.4 },
    { type: "building", side: "dire", name: "Dire building", x: 75.7, y: 34.8 },

    // Ancients
    { type: "ancient", side: "radiant", name: "Radiant Ancient", x: 18.2, y: 83.2,
        text: "Radiant starts in the southwest. The three lanes lead back to this high ground. If the enemy pushes into the base, defend the Ancient." },
    { type: "ancient", side: "dire", name: "Dire Ancient", x: 77.2, y: 24.4, icon: "images/map/ancient-dire.png",
        text: "Dire starts in the northeast. As Radiant, breaking through these defenses opens the way to the Dire Ancient." },

    // Fountains. "icon" replaces the icon of the type for one object.
    { type: "fountain", side: "radiant", name: "Radiant fountain", x: 10.4, y: 91.1 },
    { type: "fountain", side: "dire", name: "Dire fountain", x: 86.5, y: 15.9, icon: "images/map/fountain-dire.png" },

    // Twin Gates and Lotus Pools
    { type: "gate", name: "Twin Gate (top)", x: 10.0, y: 15.1, icon: "images/map/gate-dire.png" },
    { type: "gate", name: "Twin Gate (bottom)", x: 86.4, y: 88.5 },
    { type: "lotus", name: "Lotus Pool (top)", x: 9.5, y: 28.1 },
    { type: "lotus", name: "Lotus Pool (bottom)", x: 87.8, y: 79.3 },

    // Outposts and watchers
    { type: "outpost", name: "Radiant outpost", x: 27.9, y: 55.3 },
    { type: "outpost", name: "Dire outpost", x: 66.0, y: 55.8 },
    { type: "watcher", name: "Watcher", x: 13.5, y: 18.5 },
    { type: "watcher", name: "Watcher", x: 40.7, y: 31.5 },
    { type: "watcher", name: "Watcher", x: 30.7, y: 52.8 },
    { type: "watcher", name: "Watcher", x: 62.5, y: 56.6 },
    { type: "watcher", name: "Watcher", x: 53.7, y: 76.4 },

    // Neutral camps
    { type: "campSmall", name: "Small camp", x: 27.7, y: 7.4 },
    { type: "campSmall", name: "Small camp", x: 28.8, y: 26.3 },
    { type: "campSmall", name: "Small camp", x: 91.9, y: 45.8 },
    { type: "campSmall", name: "Small camp", x: 69.2, y: 80.9 },
    { type: "campSmall", name: "Small camp", x: 73.6, y: 96.8 },
    { type: "campSmall", name: "Small camp", x: 8.0, y: 62.8 },
    { type: "campMedium", name: "Medium camp", x: 31.9, y: 11.3 },
    { type: "campMedium", name: "Medium camp", x: 58.7, y: 9.5 },
    { type: "campMedium", name: "Medium camp", x: 54.4, y: 29.5 },
    { type: "campMedium", name: "Medium camp", x: 28.6, y: 47.8 },
    { type: "campMedium", name: "Medium camp", x: 5.9, y: 56.1 },
    { type: "campMedium", name: "Medium camp", x: 65.7, y: 60.7 },
    { type: "campMedium", name: "Medium camp", x: 58.3, y: 75.1 },
    { type: "campMedium", name: "Medium camp", x: 38.5, y: 78.9 },
    { type: "campMedium", name: "Medium camp", x: 36.0, y: 96.8 },
    { type: "campMedium", name: "Medium camp", x: 64.4, y: 96.8 },
    { type: "campLarge", name: "Large camp", x: 49.1, y: 8.2 },
    { type: "campLarge", name: "Large camp", x: 24.2, y: 31.3 },
    { type: "campLarge", name: "Large camp", x: 53.5, y: 38.4 },
    { type: "campLarge", name: "Large camp", x: 89.3, y: 53.6 },
    { type: "campLarge", name: "Large camp", x: 41.2, y: 71.4 },
    { type: "campLarge", name: "Large camp", x: 72.7, y: 73.4 },
    { type: "campAncient", name: "Radiant ancient camp", x: 23.3, y: 53.6 },
    { type: "campAncient", name: "Dire ancient camp", x: 70.3, y: 53.3 },
    { type: "campFlooded", name: "Flooded camp", x: 43.9, y: 25.3 },
    { type: "campFlooded", name: "Flooded camp", x: 44.6, y: 93.5 },

    // Runes. "spot" tells the two river markers apart.
    { type: "bounty", name: "Dire bounty rune", x: 43.5, y: 28.2 },
    { type: "bounty", name: "Radiant bounty rune", x: 52.0, y: 79.4 },
    { type: "river", spot: "top", name: "Top river rune", x: 39.8, y: 47.5 },
    { type: "river", spot: "bottom", name: "Bottom river rune", x: 54.4, y: 60.2 },
    { type: "wisdom", name: "Wisdom rune", x: 7.5, y: 49.0 },
    { type: "wisdom", name: "Wisdom rune", x: 90.5, y: 59.0 },

    // Roshan starts in the top pit; js/map.js moves him between the pits.
    { type: "roshan", name: "Roshan", x: 32.8, y: 40.7 },
    // The Tormentor starts in the bottom corner (day); js/map.js moves it at night.
    { type: "tormentor", name: "Tormentor", x: 87.1, y: 95.7 },

    // Lanes
    { type: "lane", pin: "T", name: "Top lane", x: 14.5, y: 30.5,
        text: "Top is the Dire safe lane and the Radiant offlane. As a Dire carry, keep the creep wave close to your tower so you have a shorter retreat." },
    { type: "lane", pin: "M", name: "Mid lane", x: 46.0, y: 55.0,
        text: "Mid connects the bases through the river. Watch both approaches before crossing the river, especially when an enemy disappears from a side lane." },
    { type: "lane", pin: "B", name: "Bottom lane", x: 84.0, y: 79.0,
        text: "Bottom is the Radiant safe lane and the Dire offlane. A Radiant support can protect the carry by watching the paths from the river." }
];
