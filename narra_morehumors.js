// MOD :: THE HUMOROUS HUMORS
// BY : narra (@storm0762)

// REORGANIZED BY : max :ᶅ (@the_dem)
// thank you max !!!!
/*
i know the restructured/reorganized version of this mod may confuse you so here's an index you can ctrl + f search to go to!!

1. CASE MODIFICATIONS
2. CSS
3. HUMOR COMPONENTS
4. HUMOR AUGMENTS
5. COMPONENT PERSONALITIES
6. COMBAT MODIFIERS
7. STATUS EFFECTS
8. COMBAT ACTORS
9. COMBAT ACTIONS
10. CUSTOM FUNCTIONS
11. FUNCTION MODIFICATIONS
12. MISCELLANEOUS (ITEMS, ITEM_EXECS, FISHIES, ETC.)

*/

/* instead of hoping that the javascript files we need are loaded...
function loadJS(files){
	return new Promise((resolve) => {
		let loaded = 0
		function handler(){
			loaded += 1
			if(loaded >= files.length){
				resolve()
			}
		}

		for(let file of files){
			let elm = document.createElement('script')
			elm.addEventListener('load', handler)
			elm.src = file
			document.body.appendChild(elm)
		}
	})
}

loadJS(
	[ '/js/shared/e3a2geli.js?v=1720995877429489400'
	, '/js/combat/combat.js?v=1720995877429489400'
	, '/js/combat/combatActorsJson.js?v=1720995877429489400'
	, '/js/combat/critta.js?v=1720995877429489400'
	, '/js/combat/combatActionsJson.js?v=1720995877429489400'
 	]
).then(() => {
	
	


 ...we force them to load before anything else in the mod does <--- this didn't work :(
*/

// CASE MODIFICATIONS
document.addEventListener('corru_entered', ()=>{
    if(page.path == '/local/beneath/embassy/' || page.path == '/local/ozo/') { // not gonna indent this so it looks not garbage

		env.dialogues["dreammod"] = generateDialogueObject(`
loop
    basterminal
        ALTERED
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
            AUTOADVANCE::
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
            AUTOADVANCE::
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            AUTOADVANCE::
            SHOWIF::"e3a2__fishy"

    RESPOBJ::basterminalResp

start
    sourceless
        the terminal displays various controls and settings for the dream.
    
    basterminal
        hi :b
        CURRENT SETTINGS
        TEXEC::\`STARTING TENSION::'\${check("e3a2_tension") || 1}'\`
        TEXEC::\`STARTING HUMORS::'\${check("e3a2_newcomp") || "normal"}'\`
        TEXEC::\`STARTING SFER::'\${check("e3a2_sfer") || "0"}'\`
        TEXEC::\`FISH SPAWN RATE::'\${check("e3a2_fishchance") ? \`\${Number(check("e3a2_fishchance")) * 100}%\`: '10%'}'\`
            SHOWIF::"e3a2__fishy"
    
    RESPOBJ::basterminalResp

tension
    basterminal
        select starting tension
        1 is default
    
    RESPONSES::self
        1<+>loop
            EXEC::change("e3a2_tension", 1)
            HIDEREAD::
        2<+>loop
            EXEC::change("e3a2_tension", 2)
            HIDEREAD::
        3<+>loop
            EXEC::change("e3a2_tension", 3)
            HIDEREAD::
        4<+>loop
            EXEC::change("e3a2_tension", 4)
            HIDEREAD::
        5<+>loop
            EXEC::change("e3a2_tension", 5)
            HIDEREAD::
        6<+>loop
            EXEC::change("e3a2_tension", 6)
            HIDEREAD::

humors
    basterminal
        select starting <span class="code">humor</span> set
        normal is default
    
    RESPONSES::self
        normal<+>loop
            EXEC::change("e3a2_newcomp", "normal")
            HIDEREAD::
        abundant<+>loop
            EXEC::change("e3a2_newcomp", "abundant")
            HIDEREAD::
        too many<+>loop
            EXEC::change("e3a2_newcomp", "too many")
            HIDEREAD::
        claws<+>loop
            EXEC::change("e3a2_newcomp", "claws")
            HIDEREAD::
        eyes<+>loop
            EXEC::change("e3a2_newcomp", "eyes")
            HIDEREAD::
        ichor<+>loop
            EXEC::change("e3a2_newcomp", "ichor")
            HIDEREAD::
        light<+>loop
            EXEC::change("e3a2_newcomp", "light")
            HIDEREAD::
        bone<+>loop
            EXEC::change("e3a2_newcomp", "bone")
            HIDEREAD::
        flesh<+>loop
            EXEC::change("e3a2_newcomp", "flesh")
            HIDEREAD::
        dull<+>loop
            EXEC::change("e3a2_newcomp", "dull")
            HIDEREAD::
        spirestone<+>loop
            EXEC::change("e3a2_newcomp", "spirestone")
            HIDEREAD::
        hands<+>loop
            EXEC::change("e3a2_newcomp", "hands")
            HIDEREAD::
        metal<+>loop
            EXEC::change("e3a2_newcomp", "metal")
            HIDEREAD::
        pain<+>loop
            EXEC::change("e3a2_newcomp", "pain")
            HIDEREAD::

fish
    basterminal
        select fish spawn rate
        10% is default
    
    RESPONSES::self
        normal (10%)<+>loop
            EXEC::change("e3a2_fishchance", "0.1")
            HIDEREAD::
        foolish (25%)<+>loop
            EXEC::change("e3a2_fishchance", "0.25")
            HIDEREAD::
        likely (50%)<+>loop
            EXEC::change("e3a2_fishchance", "0.5")
            HIDEREAD::
        guaranteed (100%)<+>loop
            EXEC::change("e3a2_fishchance", "1")
            HIDEREAD::

sfer
    basterminal
        select starting sfer
        none is default
    
    RESPONSES::self
        none (0)<+>loop
            EXEC::change("e3a2_sfer", "DELETE")
            HIDEREAD::

        some (20)<+>loop
            EXEC::change("e3a2_sfer", 20)
            HIDEREAD::

        abundant(40)<+>loop
            EXEC::change("e3a2_sfer", 40)
            HIDEREAD::

        a lot (99)<+>loop
            EXEC::change("e3a2_sfer", 99)
            HIDEREAD::
`)

if(page.party) {
		switch(check("e3a2_newcomp")) {
		case "too many":
			page.flags.components = {
				ichor: 30,
				claws: 30,
				light: 30,
				bone: 30,
				eyes: 30,
				flesh: 30,
				dull: 30,
				spirestone: 30,
				hands: 30,
				metal: 30,
				pain: 30,
				intrusive: 30,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "flesh"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "dull"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "hands"

			page.party[2].components["primary"] = "metal"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "abundant":
			page.flags.components = {
				ichor: 3,
				claws: 3,
				light: 3,
				bone: 3,
				eyes: 3,
				flesh: 3,
				dull: 3,
				spirestone: 3,
				hands: 3,
				metal: 3,
				pain: 3,
				intrusive: 3,
			}
			
			page.party[0].components["primary"] = "claws"
			page.party[0].components["secondary"] = "flesh"
			page.party[0].components["utility"] = "eyes"

			page.party[1].components["primary"] = "dull"
			page.party[1].components["secondary"] = "eyes"
			page.party[1].components["utility"] = "hands"

			page.party[2].components["primary"] = "metal"
			page.party[2].components["secondary"] = "ichor"
			page.party[2].components["utility"] = "light"
				break

		case "flesh":
			page.flags.components = { flesh: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "flesh"
				member.components["secondary"] = "flesh"
				member.components["utility"] = "flesh"
			})
				break

		case "dull":
			page.flags.components = { dull: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "dull"
				member.components["secondary"] = "dull"
				member.components["utility"] = "dull"
			})
				break

		case "spirestone":
			page.flags.components = { spirestone: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "spirestone"
				member.components["secondary"] = "spirestone"
				member.components["utility"] = "spirestone"
			})
				break
				
		case "hands":
			page.flags.components = { hands: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "hands"
				member.components["secondary"] = "hands"
				member.components["utility"] = "hands"
			})
				break
		
		case "metal":
		page.flags.components = { metal: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "metal"
				member.components["secondary"] = "metal"
				member.components["utility"] = "metal"
			})
			
				break
		
		case "pain":
		page.flags.components = { pain: 12 }

			page.party.forEach(member=>{
				member.components["primary"] = "pain"
				member.components["secondary"] = "pain"
				member.components["utility"] = "pain"
			})
		}
	}
}})


document.addEventListener('corru_entered', ()=>{
    if(page.path == '/local/beneath/embassy/') {
		
//i shouldn't have to do this, but the flan checks don't work for reasons entirely unclear to me, so i have to make this fucking shenaniganry
console.log(`creating trusiveCheck variable`)
 //holy fucking shit just define the variable you have ONE JOB
let trusiveCheck = "jesusFuckingChristJustWorkAlreadyIts10PmGodDamnIt"
console.log(`trusiveCheck variable should exist now`)
if(check("flan") == "pre-escape") {
	trusiveCheck = true
	console.log(`flan check is pre-escape, setting to true`)
}
else if(check("flan") == "post-escape") {
	trusiveCheck = true
	console.log(`flan check is post-escape, setting to true`)
}
setTimeout(()=> {
	if(!trusiveCheck) {console.log(`trusiveCheck got undefined again, somehow`)}
},
2000)
		
		if(typeof env.HUMOR_ITEMS == "undefined") env.HUMOR_ITEMS = {
			ichor: {
				name: "Ichor",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "ichor", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			claws: {
				name: "Claws",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "claws", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			light: {
				name: "Light",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "light", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			bone: {
				name: "Bone",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "bone", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			eyes: {
				name: "Eyes",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "eyes", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			flesh: {
				name: "Flesh",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "flesh", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			dull: {
				name: "Dull",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "dull", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			spirestone: {
				name: "Spirestone",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "spirestone", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			hands: {
				name: "Hands",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "hands", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			metal: {
				name: "Metal",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "metal", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			pain: {
				name: "Pain",
				value: 10,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "pain", 1)
					removeItem("sfer_cube", 10)
				}
			},
			
			intrusive: {
				name: "???",
				value: 10,
				showIf: ()=> {checkItem("sfer_cube", 10) >=10 && trusiveCheck == "true"},
				hideRead: true,
				type: "item", //we have to lie here so that these don't take up too much space in the UI
				exec: ()=> {
					CrittaReward.safeAdd(page.flags.components, "intrusive", 1)
					removeItem("sfer_cube", 10)
				}
			}
		}
		
		for(let key in env.HUMOR_ITEMS) {
			let humor = env.HUMOR_ITEMS[key]
			env.e3a2.merchant.buyResponses.replies.push({
				name: `HUMOR::${humor.name}::${humor.value}S`,
				destination: "buy",
				hideRead: true,
				showIf: ()=> checkItem("sfer_cube", 10) >=10,
				class: `commerce-item`,
				definition: `CONTENTS::1 humor of ${humor.name}`,
				exec: ()=> {humor.exec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
			})
		}
		


// CSS
content.insertAdjacentHTML('beforeend', `<style>
/* for making player cards not overflow offscreen */
.team {
    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    transition: 400ms cubic-bezier(.55,0,.39,1.26);
    z-index: 30;
    flex-wrap: wrap;
}

#combat.crittamode #enemy-team .actor {
    margin: 0px 1rem;
    margin-bottom: 3rem;
}

#ally-team .actor, {
    background-color: var(--dark-color);
    margin-top: 3rem;
}

#crittaresult, #crittaresult * {
    transition: transform 2s ease-in-out, opacity 2s ease-in-out;
    text-align: center;
    z-index: 30;
}


/* humor styling */
[component="flesh"] {
    --background: url(/img/textures/truerot.gif);
    --organelle-background: url(/img/textures/truerot.gif);    
    --background-small:  url(/img/textures/truerot.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--bastard-color);
    --font-color: var(--bastard-color);
}

[component="dull"] {
    --background: url(/img/textures/stun.gif);
    --organelle-background: url(/img/textures/stun.gif);    
    --background-small:  url(/img/textures/stun.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--bright-color);
    --font-color: var(--bright-color);
}

[component="spirestone"] {
    --background: url(/img/local/uncosm/ozo/tiles/vesselmetal.gif);
    --organelle-background: url(/img/local/uncosm/ozo/tiles/vesselmetal.gif);    
    --background-small:  url(/img/local/uncosm/ozo/tiles/vesselmetal.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--bright-color);
    --font-color: var(--bright-color);
}

[component="hands"] {
    --background: url(/img/local/uncosm/ozo/ozospiral.gif);
    --organelle-background: url(/img/local/uncosm/ozo/ozospiral.gif);    
    --background-small: url(/img/local/uncosm/ozo/ozospiral.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--neutral-color);
    --font-color: var(--neutral-color);
}

[component="metal"] {
    --background: url(/img/textures/overlay.gif);
    --organelle-background: url(/img/textures/overlay.gif);    
    --background-small: url(/img/textures/overlay.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--dark-color);
    --accent-color: var(--friend-color);
    --font-color: var(--bright-color);
}

[component="pain"] {
    --background: url(https://file.garden/ZuXhuiZ9jXAsicUq/pain_overlay_bstrdsing.gif);
    --organelle-background: url(https://file.garden/ZuXhuiZ9jXAsicUq/pain_overlay_background_bstrdsing.png);
    --background-small: url(https://file.garden/ZuXhuiZ9jXAsicUq/pain_overlay_tiny_bstrdsing.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--bastard-color);
    --accent-color: var(--bastard-color);
    --font-color: var(--bastard-color);
}

[component="intrusive"] {
    --background: url(/img/sprites/flantrusive/icon.gif);
    --organelle-background: url(/img/sprites/flantrusive/icon.gif);  
    --background-small: url(/img/sprites/flantrusive/icon.gif);
    --background-size: auto;
    --background-position: center;
    --background-color: var(--friend-color);
    --accent-color: var(--friend-color);
    --font-color: var(--friend-color);
}

  .statusfx-player_ethereal {
    background-image: url(https://serverboss-crossreference.nekoweb.org/extras/img/tvstatic.gif);
    background-size: auto 120%;
    background-position: center;
    opacity: 0.3;
}

  .statusfx-player_conjoined {
    background-image: url(https://serverboss-crossreference.nekoweb.org/extras/img/webs.gif);
    background-size: auto 200%;
    background-position: 60% 50%;
    background-repeat: no-repeat;
}

  .statusfx-favored {
    background-image: url(/img/textures/hazeflow.gif);
    background-size: auto 120%;
    background-position: center;
    opacity: 1;
}

  .statusfx-cursed {
    background-image: url(/img/textures/mneural.gif);
    background-size: auto 120%;
    background-position: center;
    opacity: 1;
}

  .statusfx-denatured {
    content: "";
    z-index: 10;
    background-image: url(/img/textures/warp.png);
    background-size: 50% auto;
    background-position: bottom;
    background-repeat: repeat-x;
    width: 200% !important;
    animation: status-drift 0.5s linear infinite;
}

  .statusfx-serrations {
    background-image: url(/img/textures/spikedorb.gif);
    background-size: auto 90%;
    background-position: 3% 50%;
    background-repeat: no-repeat;
}

  .statusfx-serrations::after {
    content: "";
    width: 100%;
    height: 125%;
    background-image: url(/img/textures/spiked.gif);
    background-size: auto;
    background-position: center;
    animation: hover-minor 5s ease-in-out infinite alternate;
}
</style>`);


// HUMOR COMPONENTS
env.COMBAT_COMPONENTS.flesh = { // husk/fear themed
    name: "Flesh",
    slug: "flesh",
    description: "'grief and tragedy'",
    help: "'fear';'rot';'hallucinations'",

    primary: {
        alterations: [["primary", "husk_attack_player"]], // familiar strike (damage + team fear)
        stats: {
            maxhp: 4
        },
    },

    secondary: {
        alterations: [["secondary", "speak_player"]], // speak (fear + stun chance)
        stats: {
            maxhp: 4
        },
    },

    utility: {
        alterations: [
			["evade", "special_demoralize"],
			["ADD", "evade"],
		], // retain focus, add custom utility
        stats: {
            maxhp: 6
        },
    },
    combatModifiers: ["flesh_adrenaline", "flesh_terminallucidity", "flesh_fightorflight"]
}

env.COMBAT_COMPONENTS.dull = { // dullfriend/dullzika themed
    name: "Dull",
    slug: "dull",
    description: "'intelligence and pioneering'",
    help: "'windup';'weakened';'summons'",

    primary: {
        alterations: [["primary", "ik_attack_weak"]], // weaker veilksplitter
        stats: {
            maxhp: 3
        },
    },

    secondary: {
        alterations: [["secondary", "dullflare_weak"]], // weaker dull flare
        stats: {
            maxhp: 3
        },
    },

    utility: {
        alterations: [
            ["evade", "special_player_dullsummon"], // replace focus with a player specific dull portal, add dull overload
            ["ADD", "special_player_dullbuff"],
        ],
        stats: {
            maxhp: 5
        },
    },
    combatModifiers: ["dull_hypervelocity","dull_multitool","dull_acuteexposure"]
}

env.COMBAT_COMPONENTS.spirestone = { // archival golem/jutskin themed
    name: "Spirestone",
    slug: "spirestone",
    description: "'strength and determination'",
    help: "'windup';'empowered';'bp'",

    primary: {
        alterations: [
			["primary", "windup"], // preparation, calculated strike
			["ADD_WINDUP", "archival_smash"]
		],
		
        stats: {
            maxhp: 5
        },
    },

    secondary: {
        alterations: [["secondary", "special_barrier_allies"]], // cover
        stats: {
            maxhp: 5
        },
    },

    utility: {
        alterations: [["evade", "evade_empowered"]], // focus but it gives empowered instead of focused
        stats: {
            maxhp: 5
        },
    },
    combatModifiers: ["spirestone_rebound","spirestone_carapace","spirestone_unshakeable"]
}

env.COMBAT_COMPONENTS.hands = { // magic themed
    name: "Hands",
    slug: "hands",
    description: "'exact meaning contested';'favored by velzie'",
    help: "'favored';'cursed';'luck'",

    primary: {
        alterations: [["primary", "ceremonial_weapon"]], // corikuva, applies a random effect on hit and crit
		
        stats: {
            maxhp: 2
        },
    },

    secondary: {
        alterations: [["secondary", "prayer"]], // prayer, applies random beneficial effect to target
        stats: {
            maxhp: 2
        },
    },

    utility: {
        alterations: [["evade", "special_prophesize"]], // prophesize, applies random negative effects to foes, applies random beneficial effects to allies, excluding the user
        stats: {
            maxhp: 3
        },
    },
    combatModifiers: ["hands_trial","hands_allseeing","hands_sacrifice"]
}

env.COMBAT_COMPONENTS.metal = { // golem themed
    name: "Metal",
    slug: "metal",
    description: "'curiosity and engineering'",
    help: "'barrier';'bp dependent statuses';'golems'",

    primary: {
        alterations: [["primary", "salvage"]], // salvage, 2 base damage with obscenely low crit rate, summons golem on crit
		
        stats: {
            maxhp: 4
        },
    },

    secondary: {
        alterations: [["secondary", "metal_barrier"]], // constructor shield but it gives a random bp effect on crit??
        stats: {
            maxhp: 2
        },
    },

    utility: {
        alterations: [["evade", "berserk"]], // basic golem's berserk
        stats: {
            maxhp: 2
        },
    },
    combatModifiers: ["metal_calc","metal_explode","metal_groundsmind"]
}

env.COMBAT_COMPONENTS.pain = { // secri/zuzucri themed
    name: "Pain",
    slug: "pain",
    description: "'selfishness, often to the detriment of the collective'",
    help: "'self-damage';'puppet';'husks'",

    primary: {
        alterations: [["primary", "special_playershelf_annihilate"]], 
        stats: {
            maxhp: 3
        },
    },

    secondary: {
        alterations: [["secondary", "infiltrate"]], // infiltrate - like speak, but on crit it gives an effect that inverts the viable targets for beneficial and offensive actions to benefit the user's team
        stats: { // aug - replace infiltrate with swarm, an action with a higher crit rate that summons a husked version of the target on crit, but can only keep one of those alive at a time
            maxhp: 3
        },
    },

    utility: {
        alterations: [["evade", "special_raise"]], // raise - like chant, but it summons a husk on a very rare crit
        stats: { // aug - replace raise with two actions, the first guarenteeing a husk spawn in exchange for self damage, the second guarenteeing a stronger husk spawn in exchange for greater self damage
            maxhp: 4
        },
    },
    combatModifiers: ["pain_terriblelife", "pain_reflexes", "pain_secri"]
}

env.COMBAT_COMPONENTS.intrusive = { // theme is self-explanatory :P
    name: "???",
    slug: "intrusive",
	showIf: ()=> check("flan"),
    description: "'indicates failure in reading methodology';'meaning unclear'",
    help: "'windup';'thoughtspace damage';'gambling'",

    primary: {
        alterations: [
			["primary", "windup"],
			["ADD_WINDUP", "trusive_smash"]
		] // preparation, unnatural strike
        // aug - thoughtsplitter - applies all of unnatural strike effects on hit except for stun, applies weak point on crit
    },

    secondary: {
        alterations: [["secondary", "special_mass_frenzy"]] // wound thoughtspace - destabilize thoughtspace but instead of destabilizing it just uses frenzy on everyone
        // aug - consume thoughtspace - destabilize thoughtspace but instead of destabilizing it you just fuckign BITE everyone
    },

    utility: {
        alterations: [["evade", "special_intrusive_alt"]] // gamble - our beloved gambling, but altered to let the user summon intrusive actors on the enemy or ally team
        // aug - intrude - fucked up and evil gamble that has like 20 more options for no good reason
    },
    combatModifiers: [""]
}


// HUMOR AUGMENTS
    // flesh
env.ACTOR_AUGMENTS.generic.necrotic_strike = {
    slug: "necrotic_strike",
    name: "Necrotic Strike",
    image: "/img/sprites/combat/augs/claw.gif",
    description: "'malform limbs further still';'applies rot on top of fear'",
    alterations: [["husk_attack_player", "husk_necrotic"]],
    component: ["primary", "flesh"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.flesh_psychosis = {
    slug: "flesh_psychosis",
    name: "Psychosis",
    image: "/img/sprites/combat/augs/parasite.gif",
    description: "'alter remains to communicate destruction';'greater stun'",
    alterations: [["speak_player", "player_psychosis"]],
    component: ["secondary", "flesh"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.special_player_chant = {
    slug: "special_player_chant",
    name: "█████",
    image: "/img/sprites/combat/augs/sacrifice.gif",
    description: "'██████ ███ █████';'convey malignant thoughtforms via speech'",
    alterations: [["special_demoralize", "special_player_chant"]],
    component: ["utility", "flesh"],
    cost: 2
}

    // dull
env.ACTOR_AUGMENTS.generic.enhance_ik_attack = {
    slug: "enhance_ik_attack",
    name: "Veilksplitter",
    image: "/img/sprites/combat/augs/cripple.gif",
    description: "'utilize greater dull connectors';'greatly enhance strike'",
    alterations: [["ik_attack_weak", "windup"],
				["ADD_WINDUP", "ik_attack_player"],
				["ADD_WINDUP", "focused_windup"]
			],
    component: ["primary", "dull"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.enhance_dullflare = {
    slug: "enhance_dullflare",
    name: "Dull Flare",
    image: "/img/sprites/combat/augs/bazruka.gif",
    description: "'boost dull flow greatly';'enhance damage and accuracy'",
    alterations: [
				["dullflare_weak", "windup"],
				["ADD_WINDUP", "dullflare_player"]
			],
    component: ["secondary", "dull"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.enhance_dullsummon = {
    slug: "enhance_dullsummon",
    name: "Weaponized Contrivance",
    image: "/img/sprites/combat/augs/bazruka.gif",
    description: "'greatly extend range of potential summons';'present many targets';'escalating negative effects from dull exposure'",
    alterations: [["special_player_dullsummon", "special_dullsummon_select"],
				["special_player_dullbuff", "special_player_dullbuff_aug"],
			],
    component: ["utility", "dull"],
    cost: 2
}

	// spirestone
env.ACTOR_AUGMENTS.generic.haymaker = {
    slug: "haymaker",
    name: "Force Multiplier",
    image: "/img/sprites/combat/augs/cripple.gif",
    description: "'directly upgrade limbs';'grant immense striking power via focus'",
    alterations: [["ADD_WINDUP", "haymaker"],
				["ADD_WINDUP", "spirestone_focused"]
			],
    component: ["primary", "spirestone"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.hardening_cover = {
    slug: "hardening_cover",
    name: "Offensive Applicators",
    image: "/img/sprites/combat/augs/barrier.gif",
    description: "'upgrade satik applicators';'barrier enhances combat ability while active'",
    alterations: [["special_barrier_allies", "special_hardening_barrier"]],
    component: ["secondary", "spirestone"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.team_huddle = {
    slug: "team_huddle",
    name: "Team Huddle",
    image: "/img/sprites/combat/augs/sacrifice.gif",
    description: "'recede and encourage team';'strike with greater power'",
    alterations: [["evade_empowered", "team_huddle"]],
    component: ["utility", "spirestone"],
    cost: 2
}

	// hands
env.ACTOR_AUGMENTS.generic.ceremonial_judgement = {
    slug: "ceremonial_judgement",
    name: "Divine Judgement",
    image: "/img/sprites/combat/augs/claw.gif",
    description: "'enchant weapon';'call forth divine intervention'",
    alterations: [["ceremonial_weapon", "ceremonial_judgement"]],
    component: ["primary", "hands"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.special_prayer_allies = {
    slug: "special_prayer_allies",
    name: "Combat Rites",
    image: "/img/sprites/combat/augs/distract.gif",
    description: "'greatly lengthen prayer';'strengthen connection with chosen deity'",
    alterations: [["prayer", "special_prayer_allies"]],
    component: ["secondary", "hands"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.special_tarot = {
    slug: "special_tarot",
    name: "Tarot Deck",
    image: "/img/sprites/combat/augs/countercall.gif",
    description: "'utilize wildly unpredictable magical item';'can grant massive boon to allies and foes'",
    alterations: [["special_prophesize", "special_tarot"]],
    component: ["utility", "hands"],
    cost: 2
}

	//metal
env.ACTOR_AUGMENTS.generic.reforge = {
    slug: "reforge",
    name: "Foundry Vat",
    image: "/img/sprites/combat/augs/drone.gif",
    description: "'attach foundry vat to repair tool';'grant access to greater golem schematics'",
    alterations: [
		["salvage", "windup"],
		["ADD_WINDUP", "reforge"]
	],
    component: ["primary", "metal"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.special_chitinous_barrier = {
    slug: "special_chitinous_barrier",
    name: "Defensive Applicators",
    image: "/img/sprites/combat/augs/parasite.gif",
    description: "'upgrade satik applicators';'barrier provides passive defense while active'",
    alterations: [["metal_barrier", "special_chitinous_barrier"]],
    component: ["secondary", "metal"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.berserk_mega = {
    slug: "berserk_mega",
    name: "Maximum Damage",
    image: "/img/sprites/combat/augs/sacrifice.gif",
    description: "'massively boost offensive capabilities';'potentially fatal if used recklessly'",
    alterations: [["berserk", "berserk_mega"]],
    component: ["utility", "metal"],
    cost: 2
}

	//pain
env.ACTOR_AUGMENTS.generic.annihilation = {
    slug: "annihilation",
    name: "Unparelleled Aggression",
    image: "/img/sprites/combat/augs/ultraspy.gif",
    description: "'adopt exponetially more aggressive attack';'overexert limbs to cause massive trauma';'greater self-damage'",
    alterations: [
		["special_playershelf_annihilate", "windup"],
		["ADD_WINDUP", "special_playershelf_annihilate_mega"]
	],
    component: ["primary", "pain"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.mitosis = {
    slug: "mitosis",
    name: "Biogenesis",
    image: "/img/sprites/combat/augs/sacrifice.gif",
    description: "'utilize own flesh to create allies';'significant self-damage'",
    alterations: [
		["special_raise", "raise_sacrifice"],
		["ADD", "raise_sacrifice_mega"]
	],
    component: ["utility", "pain"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.secri = {
    slug: "secri",
    name: "Secri Hunting Habits",
    image: "/img/sprites/combat/augs/surge.gif",
    description: "'adopt destructive infiltration method';'create husk of target on crit'",
    alterations: [["infiltrate", "swarm"]],
    component: ["secondary", "pain"],
    cost: 2
}

	//trusive
env.ACTOR_AUGMENTS.generic.thoughtsplitter = {
    slug: "thoughtsplitter",
    name: "Weaponized Incoherence",
    image: "/img/sprites/combat/augs/revise.gif",
    description: "'wield incoherent thoughtforms as a weapon';'slim chance to create weak point'\nNOTICE::DISABLES UNNATURAL STRIKE",
    alterations: [["ADD_WINDUP", "trusive_splitter"]],
    component: ["primary", "intrusive"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.consume = {
    slug: "consume",
    name: "Thoughtspace Siphoning",
    image: "/img/sprites/combat/augs/massdestabilize.gif",
    description: "'ignore thoughtspace specifications';'consume all actors for significant damage and healing'",
    alterations: [["special_mass_frenzy", "special_mass_bite"]],
    component: ["secondary", "intrusive"],
    cost: 2
}

env.ACTOR_AUGMENTS.generic.intrude = {
    slug: "intrude",
    name: "Double Or Nothing",
    image: "/img/sprites/combat/augs/bstrd.gif",
    description: "'greatly empower wheel';'many branching options'",
    alterations: [["special_intrusive_alt", "special_intrusive_mega"]],
    component: ["utility", "intrusive"],
    cost: 2
}

// COMPONENT PERSONALITIES
env.COMBAT_ACTORS.generic.reactionPersonalities.flesh = {
    evade: ["n o  c l os er","t oo  s l o  w","w e a  k"],
    crit: ["R E TU RN","R EM E MB E R","F A L L","G O O D"],
    miss: ["n  ev e r   en o  u  gh","n o  c l os er","h ol d  s t i ll"],
    dead: ["..."],
    receive_crit: ["h$œAu÷örtZË‹ŒÒOÙs"],
    receive_vulnerable: ["c  om e  cl o  sÈ r"],
    receive_puncture: ["f¥ a l li n˜¶g  a pÞ±a r t"],
    receive_regen: ["m or« e m ore m øo re"],
    receive_destabilized: ["t█ll th█m ab██t th█ m█t██r█t█"],
    receive_rez: ["w ho  l e  a g ai  n"],
    regen: ["g ro win  g","m or  e"],
    destabilized: ["s e e"],
	laugh: ["H A","A H A AAH H A aa A H A", "h e he h  e"],
    stun: ["£¢Ç¼ÒŒ³"],
    receive_carapace: ["n ew  fl e  s h"],
    receive_repairs: ["h o  w  k i  n  d"],
    receive_fear: ["n ot  cl e v er","f a mili a r  f ee li ng","u s ur p er s","i  wo n t  l e t  i  wo n t  l e t"],
    receive_redirection: ["o  n e  b  od y"]
}

env.COMBAT_ACTORS.generic.reactionPersonalities.dull = {
    evade: ["thought so", "wrong target, kelnit", "that will not work!"],
    crit: ["excellent", "perfect", "very nice"],
    crit_buff: ["nice", "very good"],
    miss: ["almost...", "not quite", "let's try again"],
    dead: ["..."],
    puncture: ["suboptimal","requesting restorative","need mending..."],
    regen: ["better", "mmm."],
    destabilized: ["not great, not terrible","we can work with this","bright light..."],
    stun: ["oouaa", "eeou"],
    laugh: ["ehehe", "hehe", "haha", "ahaha"],
    receive_hit: ["ineffective", "wrong target, kelnit"],
    receive_crit: ["gah","aaugh","why"],
    receive_puncture: ["suboptimal"],
    receive_buff: ["thank you", "good work","this will do nicely"],
    receive_destabilized: ["brilliant light...","stronger still","not great, not terrible"],
    receive_rez: ["how long was i out?","oh, they're still here"],
    receive_carapace: ["very good", "excellent","thank you"],
    receive_repairs: ["keep the barrier up", "protect our jutskins"],
    receive_fear: ["that's impossible!", "shut up shut up shut up", "i... i don't believe you", "that cannot be!"],
    receive_redirection: ["i'll hold the portal open", "thank you, friend"],
}

env.COMBAT_ACTORS.generic.reactionPersonalities.spirestone = {
    evade: ["too slow!","woah!","stop trying to hit me and hit me!"],
    crit: ["that's the hit!!","eat THIS!","take THAT!!"],
    crit_buff: ["here we go","stay behind me!","we can do this!"],
    miss: ["augh!","come on!","overshot!","no!!"],
    dead: ["..."],
    puncture: ["ow!","bleeding!!","a little help here?"],
    regen: ["thank you!","much better!"],
    destabilized: ["strange...","blurry","i think i can work with this"],
    stun: ["oouaa", "eeou","hurts..."],
    laugh: ["HA!!","ahaha!!","AHA!"],
    receive_hit: ["is that all you got??","you can hit harder than that!","i can do this all gaze!"],
    receive_crit: ["that one hurt","that's more like it","yes, that's it!","keep 'em coming!"],
    receive_puncture: ["ow!","bleeding!!","that is not good!!"],
    receive_buff: ["much better!","thank you!!","i will put it to good use!"],
    receive_destabilized: ["woah!!","what is happening??"],
    receive_rez: ["put me back in, coach!","keep 'em coming!"],
    receive_carapace: ["i am invincible!!","unstoppable!!"],
    receive_repairs: ["we will be like little gods!","good idea!"],
    receive_fear: ["you don't scare me!!","kill it! kill it!!","what is that thing??","KILL THAT THING!!"],
    receive_redirection: ["i'll be fine!!","that is not necessary!"],
}

env.COMBAT_ACTORS.generic.reactionPersonalities.hands = {
    evade: ["you can't hit me","i hold all the cards","how unfortunate!"],
    crit: ["velzie favors my tactics","REPENT","heathen!!","just as i predicted"],
    crit_buff: ["we will live on","stay focused!","a blessing, for you"],
    miss: ["gah","so it goes...","how unfortunate"],
    dead: ["..."],
    puncture: ["trial by fire...","i will be cleansed"],
    regen: ["a blessing","slowly but surely...","these things take time"],
    destabilized: ["..."],
    stun: ["i can't move...","i can't see!"],
    laugh: ["hehehe..."],
    receive_crit: ["i get it, i get it","that is not supposed to happen","i should have known"],
    receive_puncture: ["hurts..."],
    receive_buff: ["a blessing","a boon"],
    receive_destabilized: ["it's too blurry","so unnatural...","all a dream..."],
    receive_rez: ["a miracle!!"],
    receive_carapace: ["i will be your shield"],
    receive_repairs: ["a light in the darkness"],
    receive_fear: ["see no evil...","this was not in the visions!!","i have failed you","forgive me"],
    receive_redirection: ["you will be my shield"],
}

env.COMBAT_ACTORS.generic.reactionPersonalities.metal = {
    evade: ["not so easy, is it?"],
    crit: ["yes!!","it's alive!","it's working!!","i told you this would work!"],
    crit_buff: ["here you go!","this should help"],
    miss: ["come on!!","it will work eventually!"],
    dead: ["..."],
    puncture: ["taking damage!","do we have any repairfriends??"],
    regen: ["repairs in progress"],
    destabilized: ["..."],
    stun: ["my attack!!","no!!"],
    laugh: ["ehahaha!!","ahahaHA!!!"],
    receive_crit: ["gah!","everything hurts!!"],
    receive_puncture: ["ow!","repairfriends??"],
    receive_buff: ["this will serve us well!"],
    receive_destabilized: ["yes, that's it","now hit me!!"],
    receive_rez: ["oh, i'm still working!"],
    receive_carapace: ["like a little golem!"],
    receive_repairs: ["protect the jutskins!!"],
    receive_fear: ["no no no!","i cannot fight like this!!"],
    receive_redirection: ["protect the kivskins!","thank you, friend!"],
}

env.COMBAT_ACTORS.generic.reactionPersonalities.pain = {
    evade: ["missèd!","clŒ ose!","Œ¬^!!"],
    crit: ["ha!","perfect","take THAT!"],
    crit_buff: ["easy","good"],
    miss: ["oh no!","i m i‹ssed","sorry!","Ý¥"],
    dead: ["öÏLEççTžtÚ‘½ME€Œ1ÝûOU–°T","G~-ET-ˆ¼‡UïãÜP","W45¦Ú§EîÆíóAK"],
    puncture: ["bleed ¦ng!!","hurÆts«"],
    regen: ["thank you","thÆëã nk you friend"],
    destabilized: ["..."],
    stun: ["öÏLEççTžtÚ‘½ME€Œ1ÝûOU–°T","G~-ET-ˆ¼‡UïãÜP","W45¦Ú§EîÆíóAK"], //"LET ME OUT", "GET UP", "WEAK"
    laugh: ["«tÁ™êÜæàÂ‘wÐ#Ÿµ","wKþÊ0‰ä¾ß#ÔpáÙýjôã","$ì¥ù¾¢IŠ¨ÿù„"],
    receive_crit: ["hurÆts«"],
    receive_puncture: ["hurÆts«","st¾½op"],
    receive_buff: ["thÆëã nk you friend"],
    receive_destabilized: ["i should not be awa↹ke"],
    receive_rez: ["Âé8ïd#Ü","É†UÐé«±6u","yå@ÇT&Äh\ñ"],
    receive_carapace: ["thank you","thÆëã nk you friend"],
    receive_repairs: ["thank you","thÆëã nk you friend"],
    receive_fear: ["i would never betray them!","but- they are my friends!"],
    receive_redirection: ["hehehe"],
}

// COMBAT MODIFIERS
    // flesh humor
env.MODIFIERS.flesh_fightorflight = { //this makes it so this can show up as a modifier
    name: "Fight or Flight",
        getHelp: ()=> { return env.STATUS_EFFECTS.flesh_fightorflight.help },
        alterations: { 
            all: [ ["STATUS", "flesh_fightorflight"] ]
        }
}

env.MODIFIERS.flesh_terminallucidity = {
    name: "Terminal Lucidity",
    getHelp: ()=> { return env.STATUS_EFFECTS.flesh_terminallucidity.help },
    alterations: { 
        all: [ ["STATUS", "flesh_terminallucidity"] ]
    }
}

env.MODIFIERS.flesh_adrenaline = {
    name: "Adrenaline",
    getHelp: ()=> { return env.STATUS_EFFECTS.flesh_adrenaline.help },
    alterations: { 
        all: [ ["STATUS", "flesh_adrenaline"] ]
    }
}

    // dull humor
env.MODIFIERS.dull_hypervelocity = {
    name: "Hypervelocity",
    getHelp: ()=> { return env.STATUS_EFFECTS.dull_hypervelocity.help },
    alterations: { 
        all: [ ["STATUS", "dull_hypervelocity"] ]
    }
}

env.MODIFIERS.dull_multitool = {
    name: "Multi-tool",
    getHelp: ()=> { return env.STATUS_EFFECTS.dull_multitool.help },
    alterations: { 
        all: [ ["STATUS", "dull_multitool"] ]
    }
}

env.MODIFIERS.dull_acuteexposure = {
    name: "Acute Exposure",
    getHelp: ()=> { return env.STATUS_EFFECTS.dull_acuteexposure.help },
    alterations: { 
        all: [ ["STATUS", "dull_acuteexposure"] ]
    }
}
	// spirestone humor
env.MODIFIERS.spirestone_rebound = {
    name: "Rebound",
    getHelp: ()=> { return env.STATUS_EFFECTS.spirestone_rebound.help },
    alterations: { 
        all: [ ["STATUS", "spirestone_rebound"] ]
    }
}

env.MODIFIERS.spirestone_carapace = {
    name: "Defensive Maneuvers",
    getHelp: ()=> { return env.STATUS_EFFECTS.spirestone_carapace.help },
    alterations: { 
        all: [ ["STATUS", "spirestone_carapace"] ]
    }
}

env.MODIFIERS.spirestone_unshakeable = {
    name: "Unshakeable",
    getHelp: ()=> { return env.STATUS_EFFECTS.spirestone_unshakeable.help },
    alterations: { 
        all: [ ["STATUS", "spirestone_unshakeable"] ]
    }
}

env.MODIFIERS.hands_trial = {
    name: "Trial By Fire",
    getHelp: ()=> { return env.STATUS_EFFECTS.hands_trial.help },
    alterations: { 
        all: [ ["STATUS", "hands_trial"] ]
    }
}

env.MODIFIERS.hands_allseeing = {
    name: "All-Seeing",
    getHelp: ()=> { return env.STATUS_EFFECTS.hands_allseeing.help },
    alterations: { 
        all: [ ["STATUS", "hands_allseeing"] ]
    }
}

env.MODIFIERS.hands_sacrifice = {
    name: "Bindism",
    getHelp: ()=> { return env.STATUS_EFFECTS.hands_sacrifice.help },
    alterations: { 
        all: [ ["STATUS", "hands_sacrifice"] ]
    }
}

env.MODIFIERS.metal_calc = {
    name: "Overclock",
    getHelp: ()=> { return env.STATUS_EFFECTS.metal_calc.help },
    alterations: { 
        all: [ ["STATUS", "metal_calc"], ["ADD", "windup"], ["ADD_WINDUP", "archival_smash"] ]
    }
}

env.MODIFIERS.metal_explode = {
    name: "Volatile",
    getHelp: ()=> { return env.STATUS_EFFECTS.metal_explode.help },
    alterations: { 
        all: [ ["STATUS", "metal_explode"] ]
    }
}

env.MODIFIERS.metal_groundsmind = {
    name: "Illegal Groundsmindry",
    getHelp: ()=> { return env.STATUS_EFFECTS.metal_groundsmind.help },
    alterations: { 
        all: [ ["STATUS", "metal_groundsmind"] ]
    }
}

env.MODIFIERS.pain_terriblelife = {
    name: "Terrible Life",
    getHelp: ()=> { return env.STATUS_EFFECTS.pain_terriblelife.help },
    alterations: {
        all: [ ["STATUS", "pain_terriblelife"] ]
    }
}

env.MODIFIERS.pain_reflexes = {
    name: "Lingering Reflexes",
    getHelp: ()=> { return env.STATUS_EFFECTS.pain_reflexes.help },
    alterations: {
        all: [ ["STATUS", "pain_reflexes"] ]
    }
}

env.MODIFIERS.pain_secri = {
    name: "Asymptomatic",
    getHelp: ()=> { return env.STATUS_EFFECTS.pain_secri.help },
    alterations: {
        all: [ ["STATUS", "pain_secri"] ]
    }
}

// STATUS EFFECTS
    // modifiers
env.STATUS_EFFECTS.flesh_adrenaline = { 
    slug: "flesh_adrenaline",
    name: "Adrenaline",
    passive: "modifier",
    beneficial: true,
    icon: "/img/sprites/combat/passives/claws_desperation.gif",
    impulse: {type: "common", component: "flesh"},
    
    events: {
        onTurn: function() {
            if(this.status.affecting.hp <= (this.status.affecting.maxhp / 4)) {
                addStatus({target: this.status.affecting, origin: false, status: "focused", length: 1}) 
                addStatus({target: this.status.affecting, origin: false, status: "evasion", length: 2}) 
            } 

            updateStats({actor: this.status.affecting})
        },
    },

    help: "receive +FOCUSED and +EVASION when HP < 25%"
}

env.STATUS_EFFECTS.flesh_terminallucidity = { 
    slug: "flesh_terminallucidity",
    name: "Terminal Lucidity",
    passive: "modifier",
    beneficial: true,
    icon: "/img/sprites/combat/passives/light_laughterhouse.gif",
    impulse: {type: "common", component: "flesh"},
    
    events: {
        onTurn: function() {
            if(this.status.affecting.hp <= (this.status.affecting.maxhp * 0.15)) {
                addStatus({target: this.status.affecting, origin: false, status: "surge", length: 1})
                addStatus({target: this.status.affecting, origin: false, status: "focused", length: 2})
                addStatus({target: this.status.affecting, origin: false, status: "evasion", length: 3})
                addStatus({target: this.status.affecting, origin: false, status: "empowered", length: 2})
                addStatus({target: this.status.affecting, origin: false, status: "carapace", length: 3})
                addStatus({target: this.status.affecting, origin: false, status: "spikes", length: 3})
				addStatus({target: this.status.affecting, origin: false, status: "regen", length: 1})
                    if(!this.status.affecting.minotaursMazeContingencyPlan) {
                        if(!this.status.affecting.statusImmunities) {
                            this.status.affecting.statusImmunities = ["stun"]; //the game will shit itself if you add an immunity to someone who doesnt have them defined, so we define them here if they dont have any
                            this.status.affecting.minotaursMazeContingencyPlan = true //surprise tool that will help us later
                        } else if(!this.status.affecting.statusImmunities.includes("stun")) { //if they arent already immune to stun, makes them
                            this.status.affecting.statusImmunities.push("stun")
                            this.status.affecting.minotaursMazeContingencyPlan = true
                        }
                    }
            } else { //i know you can use an elif here but i'm too lost in a minotaurs maze of my own making
                if(this.status.affecting.minotaursMazeContingencyPlan) {//ok what the fuck is this
                    this.status.affecting.statusImmunities.pop() 
                    this.status.affecting.minotaursMazeContingencyPlan = false
                }
            }

            updateStats({actor: this.status.affecting})
        }
    },

    help: "receive wide array of positive status effects and stun immunity when HP < 15%"
}

    env.STATUS_EFFECTS.flesh_hysteria = { 
        slug: "flesh_hysteria",
        name: "Hysteria",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/light_dark.gif",
        impulse: {type: "common", component: "flesh"},
		outgoingCrit: 0,
        
        events: {
            onTurn: function() {
				if(hasStatus(this.status.affecting, "fear")
					&& hasStatus(this.status.affecting, "flesh_hysteria")){
                    this.status.outgoingCrit = 2
                } else {
                    this.status.outgoingCrit = 0
                }

                updateStats({actor: this.status.affecting})
            },
        },

        help: "+200% outgoing crit rate if afflicted with FEAR"
    }, 

env.STATUS_EFFECTS.flesh_fightorflight = {
    slug: "flesh_fightorflight",
    name: "Fight or Flight",
    passive: "modifier",
    beneficial: false, //you have to LIE here for reasons i only pretend to comprehend
	outgoingToHit: 0,
	outgoingCrit: 0,
    icon: "/img/sprites/combat/passives/light_dark.gif", //change this if you so desire

    events: {
        GLOBAL_onBeforeCombatHit: function(context) { //run before ALL moves decide if they hit
            if(context.origin == this.status.affecting) { //so that this only applies to the impulse haver
                let fearCount = hasStatus(context.originalEventTarget, "fear") //gets number of turns of fear

                if(fearCount) { //checks if fearcount returned anything
                    this.status.outgoingToHit = 0.5 * fearCount //0.5 per fear, 0.5 = 50%
                    this.status.outgoingCrit = 0.5 * fearCount //0.5 per fear, 0.5 = 50%
                } else {
                    this.status.outgoingToHit = 0 //dont do shit if fearcount didnt give anything
                    this.status.outgoingCrit = 0 //dont do shit if fearcount didnt give anything
                }
			}
		},
		onCrit: function({subject, origin, attack, beneficial}) {
			if(beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
			addStatus({target: subject, origin, status: "fear", length: (0 + attack)}); 

			setTimeout(
				()=>{
					play("fear", 0.5, 0.5)
				
					sendFloater({
						target: this.status.affecting,
						type: "arbitrary",
						arbitraryString: "FIGHT!",
					})
								
					readoutAdd({
						message: `${this.status.affecting.name}'s strike terrifies ${subject.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
						name: "sourceless", 
						type: "sourceless combat minordetail",
						show: false,
						sfx: false
					})
				},
				env.ADVANCE_RATE * 0.2)
		}
    },
    help: "+50% outgoing hit and crit chance per T:FEAR\nwhen critting a foe, inflict xT:FEAR equal to damage dealt"
}

env.STATUS_EFFECTS.dull_hypervelocity = { 
    slug: "dull_hypervelocity",
    name: "Hypervelocity",
    passive: "modifier",
    beneficial: true,
    icon: "/img/sprites/combat/passives/light_dark.gif",
    impulse: {type: "common", component: "dull"},
    
    events: {
        onAddStatus: function({target, statusObj}) {
            if(statusObj.slug == "evasion") {
                statusObj.infinite = true
                statusObj.duration = 1
            }
        },
    },

    help: "evasion has infinite duration"
}

    env.STATUS_EFFECTS.dull_highenergy = { 
        slug: "dull_highenergy",
        name: "High Energy",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/chitin.gif",
        impulse: {type: "common", component: "dull"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                if(Math.random() < 0.75 || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "destabilized", length: 2}); 

                setTimeout(()=>{
                    play("dull", 1.5, 1.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "HIGH ENERGY!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name}'s strike sears their target! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when critting a foe, 25% chance to inflict 2T:DESTABILIZED"
    }

    env.STATUS_EFFECTS.dull_multitool = { 
        slug: "dull_multitool",
        name: "Multi-tool",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/light_laughterhouse.gif",
        impulse: {type: "common", component: "dull"},
        
        events: {
            onAction: function({user, action, target}) {
                if(action.slug.includes("incoherent_") || action.slug.includes("intrusive") || action.slug == "special_archiveshelf_annihilate" || target.state == "dead" || user.state == "dead" || hasStatus(user, "fear")) return;
                
                if(Math.random() < (0.15 + hasStatus(user, "light_humorist") ? 0.15 : 0)) {
                    reactDialogue(this.status.affecting, 'laugh')

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "MULTI-TOOL!",
                        size: 1.5
                    })

                    readoutAdd({
                        message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
					let nextAction = user.actions
					if (hasStatus(user, "windup")) {nextAction = user.windupActions}
					let chosenAction = env.ACTIONS[nextAction.sample()]
					onBeforeAction: { 
						if (chosenAction.beneficial) // stop quick mending the firmament !! idiot !! stupid !!
							target = user.team.members.filter(member => member.state == "living").sample()
						else target = user.enemyTeam.members.filter(member => member.state == "living").sample() // stop hitting yourself !! stop hitting yourself !!
								}

                    setTimeout(()=>useAction(user, chosenAction, chosenAction.beneficial ? user : target, {triggerActionUseEvent: true, beingUsedAsync: true, reason: "multitool"}), 500)
                }
            },
        },

        help: "most actions have a 15% chance to prompt another random action"
    },

    env.ACTIONS.special_irradiate = {
        slug: "special_irradiate",
        name: "Irradiate",
        type: 'special',
        desc: "'flood battlefield with dull radiation';'fatal if misused'",
        help: "ALL::AUTOHIT +1T:DESTABILIZE",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "THE THOUGHTSPACE GROWS VIOLENT", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 50)
                    setTimeout(()=>{content.classList.remove('painmode')}, 2000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 2500)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 2000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 50)
                setTimeout(()=>{content.classList.remove('painmode')}, 2000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 2500)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'destabilize',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "destabilized", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    env.STATUS_EFFECTS.dull_acuteexposure = { 
        slug: "dull_acuteexposure",
        name: "Acute Exposure",
        passive: "modifier",
        help: "all targeted actions have a 20% chance to become IRRADIATE\nIRRADIATE::(ALL::AUTOHIT +1T:DESTABILIZE)",
        infinite: true,
        icon: "/img/sprites/combat/passives/claws_rabid.gif",
        
        events: {
            onBeforeAction: function(context) {
                if(!context.settings.action.type.includes("target")) return;
                
                // alter action maybe
                if(Math.random() < (0.2)) {

                    context.settings.action = env.ACTIONS["special_irradiate"]
                    let subject = context.settings.user

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "EXPOSURE!",
                        isGood: false,
                        size: 2,
                    })

                    readoutAdd({
                        message: `dull radiation flows through ${subject.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },
        }
    },

    env.STATUS_EFFECTS.spirestone_berserk = { 
        slug: "spirestone_berserk",
        name: "Berserk",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/veilkdrop.gif",
        impulse: {type: "common", component: "spirestone"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                if(Math.random() < 0.25 || subject == this.status.affecting || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "open_wound", length: 2}); 
                
                setTimeout(()=>{
                    playCombatCrit()
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "BERSERK!",
                    })
                                    
                    readoutAdd({
                        message: `${origin.name} leaves ${subject.name} reeling! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when critting a foe, 25% chance to inflict 2T:OPEN WOUND"
    },

    env.STATUS_EFFECTS.spirestone_rebound = { 
        slug: "spirestone_rebound",
        name: "Rebound",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/eyes_wounded.gif",
        impulse: {type: "common", component: "spirestone"},
        
        events: {
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "stun") {
                    addStatus({target: target, origin: false, status: "surge", length: 1})
					addStatus({target: target, origin: false, status: "evasion", length: 2})
					addStatus({target: target, origin: false, status: "focused", length: 1})
                }
            },
        },

        help: "grant 1T:FOCUSED, 2T:EVASION and SURGE and when stun is removed"
    },

    env.STATUS_EFFECTS.spirestone_carapace = { 
        slug: "spirestone_carapace",
        name: "Defensive Maneuvers",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/bone_spiked.gif",
        impulse: {type: "common", component: "spirestone"},
        
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "evasion") context.status = "carapace"
				if(context.status == "spikes") context.status = "carapace"
            },
        },

        help: "evasion and spikes become carapace"
    },

	env.STATUS_EFFECTS.spirestone_unshakeable = { 
		slug: "spirestone_unshakeable",
		name: "Unshakeable",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/bone_ablative.gif",
		
		events: {
			onCreated: function() {
					if(!this.status.affecting.minotaursMazeContingencyPlan) {
						if(!this.status.affecting.statusImmunities) {
							this.status.affecting.statusImmunities = ["stun"]; //the game will shit itself if you add an immunity to someone who doesnt have them defined, so we define them here if they dont have any
							this.status.affecting.minotaursMazeContingencyPlan = true //surprise tool that will help us later
						} else if(!this.status.affecting.statusImmunities.includes("stun")) { //if they arent already immune to stun, makes them
							this.status.affecting.statusImmunities.push("stun")
							this.status.affecting.minotaursMazeContingencyPlan = true
						}
					}
				updateStats({actor: this.status.affecting})
			} 
		},

		help: "all actors have stun immunity"
	},
	
	env.STATUS_EFFECTS.hands_heal = { 
        slug: "hands_heal",
        name: "Last Rites",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "hands"},
        icon: "/img/sprites/combat/passives/bone_collectivism.gif",
        
        events: {
            GLOBAL_onDeath: function({originalEventTarget}) {
                if(
                    this.status.affecting.state == "dead" ||
                    this.status.affecting.team.members.includes(originalEventTarget)
                ) return;
                    
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    arbitraryString: "LAST RITES!",
                })
                                
                readoutAdd({
                    message: `${this.status.affecting.name} heals from ${originalEventTarget.name}'s defeat! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })

                combatHit(this.status.affecting, {amt: -4, beneficial: true, origin: this.status.affecting, runEvents: false});
            }
        },

        help: "on foe down, receive +4HP"
    },
	
	env.STATUS_EFFECTS.hands_trial = { 
        slug: "hands_trial",
        name: "Trial By Fire",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/dancer.gif",
        impulse: {type: "common", component: "hands"},
        
        events: {
            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "puncture") {
                    addStatus({target: target, origin: false, status: "regen", length: 1})
                    combatHit(this.status.affecting, {amt: -1, beneficial: true, origin: this.status.affecting, runEvents: false});
                }
            },
        },

        help: "grant +1HP and +1T:REGEN when puncture is removed"
    },
	
	env.STATUS_EFFECTS.hands_damnation = { 
        slug: "hands_damnation",
        name: "Damnation",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/eye_betrayal.gif",
        impulse: {type: "common", component: "hands"},
        
        events: {
            onHit: function({subject, origin, attack, beneficial}) {
                if(beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "cursed", length: 1}); 

                setTimeout(()=>{
                    play("talkfairy", 0.5, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DAMNATION!",
                    })
                                    
                    readoutAdd({
                        message: `${this.status.affecting.name}'s strike curses their target! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when hitting a foe, inflict +1T:CURSED"
    },
	
	env.STATUS_EFFECTS.hands_allseeing = { 
        slug: "hands_allseeing",
        name: "All-Seeing",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "hands"},
        icon: "/img/sprites/combat/passives/eyes_spotter.gif",
        
        events: {
            GLOBAL_onEvade: function({subject, target, attack, runEvents, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    user.team.members.includes(target) || 
                    target.state == "dead" ||
                    user.state == "dead" ||
                    subject != user
                ) return;

                setTimeout(()=>{
                    addStatus({target: user, origin: user, status: "favored", length: 2}); 
            
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "ALL-SEEING!",
                    })
                
                    readoutAdd({
                        message: `${user.name} sees a vision as they miss! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when missing a foe, grant +2T:FAVORED"
    },
	
	env.STATUS_EFFECTS.hands_sacrifice = { 
        slug: "hands_sacrifice",
        name: "Bindism",
        passive: "modifier",
        beneficial: false,
        icon: "/img/sprites/combat/passives/ichor_sacrifice.gif",
        
        events: {
            onStruck: function({attack}) {
                let damageAmt = Math.floor(attack / 2)
				if(damageAmt < 1) {
					damageAmt = 1
				}
                if(damageAmt > 0) {
                    let validTargets = env.rpg.turnOrder.filter(actor => (actor != this.status.affecting) && (actor.state != "dead"))

                    setTimeout(()=>{
                        play('status', 0.5, 1)
                        let target = validTargets.sample()

                        sendFloater({
                            target,
                            type: "arbitrary",
                            arbitraryString: "BOUND!",
                        })
						
						combatHit(target, {amt: damageAmt, autohit: true, redirectable: false, runEvents: false});
						
                        readoutAdd({
                            message: `${target.name} receives a sacrifice of -${damageAmt}HP! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail", 
                            show: false,
                            sfx: false
                        })
                    }, env.ADVANCE_RATE * 0.2)
                }
            },
        },

        help: "half of damage taken is given to a random actor as damage (rounded down, min: -1HP)"
    },
	
	env.STATUS_EFFECTS.hands_daemon = { 
        slug: "hands_daemon",
        name: "Faustian Deal",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/light_glee.gif",
        impulse: {type: "common", component: "hands"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
				let user = this.status.affecting
				let target = this.status.affecting
				let rand = Math.random()
                if( (rand < 0.9) || subject == this.status.affecting || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
				//useAction(this.status.affecting, env.ACTIONS.special_player_handssummon, user, {beingUsedAsync: true, reason: "deal"}) <---- we don't actually need this part do we
                
                setTimeout(()=>{
					if(user.team.members.filter(m=>m.slug.includes('hands')).length < 4) {
					play('talkfairy', 0.5);

					let daemon_peasant = ['player_hands_critta_pawn','player_hands_critta_knight','player_hands_critta_bishop','player_hands_critta_rook']
					let daemon_royal = ['player_hands_critta_queen','player_hands_critta_king']
					let daemon_divine = ['player_hands_critta_dragon','player_hands_critta_unicorn','player_hands_critta_princess','player_hands_critta_princess_defensive','player_hands_critta_princess_hybrid','player_hands_critta_superknight']
					
					var newAllySlug = daemon_peasant.sample()
					var newAllySlug1 = daemon_royal.sample()
					var newAllySlug2 = daemon_divine.sample()

					//try to center the dude
					if(user.team.members.length == 14) {
						let uI = user.team.members.findIndex(a => a.slug == user.slug)
						if(uI < 3) midCombatAllyAdd('player_hands_critta_pawn', 'left')
						else if(uI >= 3) midCombatAllyAdd('player_hands_critta_pawn', 'right')	
					} else {
						let rand = Math.random()
						if (rand > 0.5) {
							let rand1 = Math.random()
							if (rand1 < 0.5) {
								midCombatAllyAdd(newAllySlug,'left')
							} 
							else if (rand1 < 0.8) {
								midCombatAllyAdd(newAllySlug1,'left')	
							}
							else {
								midCombatAllyAdd(newAllySlug2,'left')	
							}
						}
						else {
							let rand2 = Math.random()
							if (rand2 < 0.5) {
								midCombatAllyAdd(newAllySlug,'right')
							} 
							else if (rand2 < 0.8) {
								midCombatAllyAdd(newAllySlug1,'right')
							}
							else {
								midCombatAllyAdd(newAllySlug2,'right')
							}
						}
					}
				}
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "DEAL!",
                    })
                                    
                    readoutAdd({
                        message: `${origin.name}'s powerful strike binds a daemon onto the battlefield! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when critting a foe, 10% chance to summon daemonic ally (MAX::4)"
    },
	
	env.STATUS_EFFECTS.hands_superstition = {
		slug: "hands_superstition",
		name: "Superstitious",
		passive: true,
		beneficial: true,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/statusGAMBLING_amber.png",
		events: {
			onAction: function({action}) {
				if(action.slug.includes('tarot') || action.slug.includes('select')) return
				else useAction(this.status.affecting, env.ACTIONS.special_tarot_noadvance, this.status.affecting, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "superstition"})
			}
		},
		help: "draw tarot card when using most actions"
	},
	
	env.ACTIONS.metal_drone_deflect = {
        slug: "metal_drone_deflect",
        name: "Drone Strike",
        type: 'target',
        desc: "'strike against analyzed weakness'",
        anim: "basic-attack",
        help: "75% -1HP +2T:VULNERABLE, 10%C x2 +1T:STUN",
        usage: {
            act: "%USER THROWS %TARGET OFF",
        },
        accuracy: 0.5,
        crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
				hitStatus: {
					name: 'vulnerable',
					length: 2
				},
				critStatus: {
					name: 'stun',
					length: 1
				},
            })
        }
    },
	
	env.STATUS_EFFECTS.metal_drone = { 
        slug: "metal_drone",
        name: "Countermeasures",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "metal"},
        icon: "/img/sprites/combat/augs/drone.gif",
        
        events: {
            onTurn: function() {
                let user = this.status.affecting
                let shownNotice = false
                env.recentSfx = false

                env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        if(hasStatus(actor, "windup")) {
                            env.GENERIC_ACTIONS.singleTarget({
                                action: env.ACTIONS['metal_drone_deflect'], 
                                user, 
                                target: actor,
                                hitSfx: { name: 'shot2', rate: 1, volume: 0.5 },
                                critSfx: { name: 'shot6', rate: 1, volume: 1 },
								missSfx: { name: 'shot2', rate: 1.5, volume: 0.5 },
								hitStatus: { name: 'vulnerable', length: 2 },
								critStatus: { name: 'stun', length: 1 },
                                genExec: ()=>{
                                    if(!shownNotice) {
                                        sendFloater({
                                            target: user,
                                            type: "arbitrary",
                                            arbitraryString: "COUNTERMEASURES!",
                                        })

                                        readoutAdd({
                                            message: `${user.name}'s <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span> distracts all wound up foes`, 
                                            name: "sourceless", 
                                            type: "sourceless combat minordetail", 
                                            show: false,
                                            sfx: false
                                        })

                                        shownNotice = true
                                    }
                                }
                            })
                        }
                    }
                })
            },
        },

        help: `if alive, attack all wound up foes on turn\n(${env.ACTIONS['metal_drone_deflect'].help})`
    },
	
	env.STATUS_EFFECTS.metal_adaptive = { 
        slug: "metal_adaptive",
        name: "Responsive Armor",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/adaptive.gif",
        impulse: {type: "common", component: "metal"},
        
        events: {
            onStruck: function({subject, attack, beneficial}) {
                if(beneficial || this.status.affecting.state == "dead") return;
                addStatus({target: this.status.affecting, origin: subject, status: "carapace", length: 2}); 

                setTimeout(()=>{
                    play("guard", 1.25, 0.5)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "RESPOND!",
                    })

                    readoutAdd({
                        message: `${this.status.affecting.name}'s form shifts defensively in response to the attack! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when struck offensively, gain 2T:CARAPACE"
    },
	
	env.ACTIONS.brawl_weak_metal = {
        slug: "brawl_weak_metal",
        name: "Heavy Strike",
        verb: "strike",
        type: 'target',
        desc: "'improvise risky but powerful strike'",
        anim: "basic-attack",
        help: "40% -2HP, 5%C X2",
        usage: {
            act: "%USER CLUMSILY ATTACKS %TARGET",
            crit: "%TARGET IS KNOCKED BACK",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.4,
        crit: 0.05,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
				missSfx: {
					name: 'miss',
					rate: 0.75
				},
            })
        }
    },
	
    env.STATUS_EFFECTS.metal_disable = { 
        slug: "metal_disable",
        name: "Paralysis",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/claws_infection.gif",
        impulse: {type: "common", component: "metal"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                if(Math.random() < 0.25 || subject == this.status.affecting || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "weakened", length: 2}); 
                
                setTimeout(()=>{
                    playCombatCrit()
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "PARALYSIS!",
                    })
                                    
                    readoutAdd({
                        message: `${origin.name} leaves ${subject.name} reeling! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when critting a foe, 25% chance to inflict 2T:WEAKENED"
    },
	
	env.ACTIONS.special_metal_destruct = {
        slug: "special_metal_destruct",
        name: "Explode",
        type: 'special',
        desc: "'form shrapnel in body';'propel through unsustainable means'",
        help: "FOES::50% -1HP, 5%C x2 +2T:PUNCTURE",
        anim: "explode",
        accuracy: 0.5,
        crit: 0.05,
        amt: 1,
        usage: {
            act: "%USER JUST EXPLODES"
        },
        exec: function(user, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'shot2' },
                        critSfx: { name: 'shot6' },
                        critStatus: {
                            name: 'puncture',
                            length: 2
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.STATUS_EFFECTS.metal_explode = {
        slug: "metal_explode",
        name: "Volatile",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "metal"},
        icon: "/img/sprites/combat/passives/ichor_finisher.gif",
        
        events: {
            onCritStruck: function() {
                let user = this.status.affecting
                let shownNotice = false
                env.recentSfx = false

				useAction(this.status.affecting, env.ACTIONS.special_metal_destruct, user, {beingUsedAsync: true, reason: "volatile"})

				if(!shownNotice) {
					sendFloater({
						target: user,
						type: "arbitrary",
						arbitraryString: "VOLATILE!",
					})

					readoutAdd({
						message: `${user.name} explodes as they are struck!`, 
						name: "sourceless", 
						type: "sourceless combat minordetail", 
						show: false,
						sfx: false
					})

					shownNotice = true
				}
            },
        },

        help: `when receiving a critical hit, explode\n(${env.ACTIONS['special_metal_destruct'].help})`
    },
	
	env.STATUS_EFFECTS.metal_groundsmind = {
        slug: "metal_groundsmind",
        name: "Illegal Groundsmindry",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/light_glee.gif",
        impulse: {type: "common", component: "metal"},
        
        events: {
            onBeforeAddStatus: function(context) {
                if(context.status == "destabilized") context.status = "denatured"
            },
        },

        help: "destabilized becomes denatured"
    },
	
	env.STATUS_EFFECTS.metal_calc = {
        slug: "metal_calc",
        name: "Overclock",
        passive: "modifier",
        beneficial: true,
        icon: "/img/sprites/combat/passives/bone_collectivism.gif",
		//where we're going, we don't NEED an events property
        help: "all actors receive PREPARATION and CALCULATED STRIKE"
    },

	env.STATUS_EFFECTS.pain_terriblelife = {
		slug: "pain_terriblelife",
		name: "Terrible Life",
		passive: "modifier",
		beneficial: false,
		infinite: true,
		icon: "/img/sprites/combat/passives/claws_rabid.gif",
		events: {
			onTurn: function() {
                //deals either 10% of their remaining HP, or 1 damage (whichever's higher)
                //console.log('target is', this.status.affecting, 'so executing', this.status)
                reactDialogue(this.status.affecting, 'puncture');

                let amt = (Math.floor(this.status.affecting.hp * 0.1) || 1)

                combatHit(this.status.affecting, {amt: amt, autohit: true, redirectable: false, runEvents: false});
                play('status', 1, 0.5);
            },
			
			onStruck: function({subject, attack, beneficial}) {
                if(beneficial) return;
                let returnDmg = -1 * (Math.max(Math.floor(attack * 0.5)+1))

                setTimeout(()=>{
                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "TERRIBLE LIFE!",
                        isGood: false,
                        size: 1,
                    })

                    readoutAdd({
                        message: `${subject.name} receives +${Math.abs(returnDmg)}HP via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })

                    forcePlay("mend", 0.7, 0.8)
                    combatHit(subject, {amt: returnDmg, autohit: true, crit: 0, origin: false, redirectable: false})
                }, env.ADVANCE_RATE * 0.2)
            },
		},
		help: "-10%HP/turn, min:1\nattackers receive 50% of damage as HP, min:1"
	},
	
	env.STATUS_EFFECTS.pain_reflexes = { 
        slug: "pain_reflexes",
        name: "Lingering Reflexes",
        passive: "modifier",
        help: "all targeted actions have a 20% chance to become FAMILIAR STRIKE\nFAMILIAR STRIKE::80% -2HP, 10%C x2 + (TARGET TEAM::+2T:FEAR)",
        infinite: true,
        icon: "/img/sprites/combat/passives/eye_betrayal.gif",
        
        events: {
            onBeforeAction: function(context) {
                if(!context.settings.action.type.includes("target")) return;
                
                // alter action maybe
                if(Math.random() < (0.2)) {

                    context.settings.action = env.ACTIONS["husk_attack_impulse"]
                    let subject = context.settings.user

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "REFLEX!",
                        isGood: false,
                        size: 2,
                    })

                    readoutAdd({
                        message: `${subject.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },
        }
    },
	
	env.STATUS_EFFECTS.pain_terror = { 
        slug: "pain_terror",
        name: "Terror",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/veilkdrop.gif",
        impulse: {type: "common", component: "pain"},
        
        events: {
            onCrit: function({subject, origin, attack, beneficial}) {
                if(Math.random() < 0.25 || subject == this.status.affecting || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                addStatus({target: subject, origin, status: "fear", length: 3}); 
                
                setTimeout(()=>{
                    play('fear', 0.75)
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "TERROR!",
                    })
                                    
                    readoutAdd({
                        message: `${origin.name} leaves ${subject.name} paralyzed with fear! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "when critting a foe, 25% chance to inflict 3T:FEAR"
    },
	
	env.STATUS_EFFECTS.pain_strength = { 
        slug: "pain_strength",
        name: "Thrillseeker",
        passive: true,
        beneficial: true,
        impulse: {type: "common", component: "pain"},
		outgoingMult: 0,
        icon: "/img/sprites/combat/passives/ichor_strength.gif",
        
        events: {
            onTurn: function() {
                if(this.status.affecting.hp <= this.status.affecting.maxhp * 0.25) this.status.outgoingMult = 1
                else this.status.outgoingMult = 0
            },
        },

        help: "+100% outgoing damage/heal at <25% HP"
    },
	
	env.STATUS_EFFECTS.pain_masochist = {
		slug: "pain_masochist",
		name: "Masochist",
		passive: true,
		beneficial: true,
		impulse: {type: "common", component: "pain"},
		outgoingToHit: 0,
		outgoingCrit: 0,
		icon: "/img/sprites/combat/passives/chitin.gif",
		
		events: {
			GLOBAL_onBeforeCombatHit: function(context) { //run before ALL moves decide if they hit
				if(context.origin == this.status.affecting) { //so that this only applies to the impulse haver
					let turnCount = 0
					for(let status of Object.values(env.STATUS_EFFECTS)) {
						if(!status['beneficial'] && !status['passive'] ) { //don't iterate through impulses
							let turnAdd = Math.floor(hasStatus(this.status.affecting, status.slug))
							turnCount = turnCount + turnAdd
						}
					} //gets number of turns of all negative statuses

					if(turnCount) { //checks if turnCount returned anything
						this.status.outgoingToHit = 0.2 * turnCount //0.2 per effect
						this.status.outgoingCrit = 0.2 * turnCount //0.2 per effect
					} else {
						this.status.outgoingToHit = 0 //dont do shit if turnCount didnt give anything
						this.status.outgoingCrit = 0 //dont do shit if turnCount didnt give anything
					}
				}
			},
		},
		help: "+20% outgoing hit%, crit% per turn of all detrimental status effects"
	},
	
	env.STATUS_EFFECTS.pain_secri = {
		slug: "pain_secri",
		name: "Asymptomatic",
		passive: true,
		beneficial: true,
		impulse: {type: "common", component: "pain"},
		icon: "/img/sprites/combat/passives/claws_infection.gif",
		
		events: {
			onDeath: function() {
				let user = this.status.affecting
				if(hasStatus(user, "ethereal") || hasStatus(user, "player_ethereal")) return //don't summon a secri if the last death was a summoned actor
				if(user.team.name == "enemy") {
					if(this.status.lastSide) {
						midCombatEnemyAdd('pain_secri_enemy', 'left') //TODO::actually make the pain_secri_enemy actor
						play('stab', 0.5)
						this.status.lastSide = 0
					} else {
						midCombatEnemyAdd('pain_secri_enemy', 'right') //also maybe make it summon an ally version if the affected actor is on the ally team
						play('stab', 0.5)
						this.status.lastSide = 1
					}
				} else {
					if(this.status.lastSide) {
						midCombatAllyAdd('pain_secri_ally', 'left')
						play('stab', 0.5)
						this.status.lastSide = 0
					} else {
						midCombatAllyAdd('pain_secri_ally', 'right')
						play('stab', 0.5)
						this.status.lastSide = 1
					}
				}
				
				sendFloater({
					target: user,
					type: "arbitrary",
					arbitraryString: "ASYMPTOMATIC!",
					size: 1.5,
				})
			
				readoutAdd({
					message: `the secri abandons its host as ${user.name} dies! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
					name: "sourceless", 
					type: "sourceless combat minordetail", 
					show: false,
					sfx: false
				})
			},
		},
		help: "on death, summon secri\nif dead actor is an ally, summon as ally\nif dead actor is a foe, summon as foe"
	},
	
    env.STATUS_EFFECTS.flesh_menace = { 
        slug: "flesh_menace",
        name: "ACTION::Menace",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "flesh",},
        icon: "/img/sprites/combat/passives/meyetiny.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack
            GLOBAL_onEvade: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
                    target == user ||
                    hasStatus(user, "fear")
                ) return;
				
				let dullUtility = [2, 4, 4, 5, 5, 5, 6, 6, 6, 6]
				
                let utility = env.ACTIONS[user.actions[2]]
				if (user.actions.includes('special_player_dullsummon_low')) {
					utility = env.ACTIONS[user.actions[dullUtility.sample()]]
				}

                setTimeout(()=>{
                    useAction(this.status.affecting, utility, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "menace"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `MENACE::${utility.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} grasps the opportunity as ${subject.name} misses! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "if alive, on ally evade, use utility"
    },

    env.STATUS_EFFECTS.dull_pragmatist = { 
        slug: "dull_pragmatist",
        name: "ACTION::Pragmatist",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "dull",},
        icon: "https://file.garden/ZuXhuiZ9jXAsicUq/weyetiny.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack
            GLOBAL_onEvade: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
                    target == user ||
                    hasStatus(user, "fear")
                ) return;

                let secondary = env.ACTIONS[this.status.affecting.actions[1]]
				if (hasStatus(this.status.affecting, "windup") && this.status.affecting.windupActions.length > 1) (secondary = env.ACTIONS[this.status.affecting.windupActions[1]])

                setTimeout(()=>{
                    useAction(this.status.affecting, secondary, secondary.beneficial ? target : subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "pragmatist"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `PRAGMATIST::${secondary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} supports their team as ${subject.name} misses! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "if alive, on ally evade, use secondary \nif secondary is beneficial, used on ally\nif secondary is offensive, used on foe"
    },

    env.STATUS_EFFECTS.spirestone_parry = { 
        slug: "spirestone_parry",
        name: "ACTION::Parry-Riposte",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "spirestone",},
        icon: "/img/sprites/combat/passives/beyetiny.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack <- really hoping this holds true for critical hits cause boy howdy if it doesn't i am FUCKED (it does !! yaaaay :D)
            GLOBAL_onCritStruck: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
					target == user ||
					hasStatus(user, "fear")
                ) return;
				
				let dullUtility = [2, 4, 4, 5, 5, 5, 6, 6, 6, 6]
				
                let utility = env.ACTIONS[user.actions[2]]
				if (user.actions.includes('special_player_dullsummon_low')) {
					utility = env.ACTIONS[user.actions[dullUtility.sample()]]
				}
                let primary = env.ACTIONS[user.actions[0]]
				if (hasStatus(this.status.affecting, "windup")) (primary = env.ACTIONS[user.windupActions[0]])

                setTimeout(()=>{
					if([user.actions[2]]) {
						useAction(this.status.affecting, utility, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "parry"})
					}
                    sendFloater({ 
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `PARRY::${utility.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} parries ${subject.name}'s attack! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2),
				
				setTimeout(()=>{
                    useAction(this.status.affecting, primary, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "riposte"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `RIPOSTE::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} counterattacks! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.4)
            }
        },

        help: 'if alive, when an ally receives a critical hit, use utility, then counterattack against attacker with primary'
    },

	env.STATUS_EFFECTS.hands_penance = {
		slug: "hands_penance",
		name: "ACTION::Penance",
		passive: true,
		beneficial: true,
		impulse: {type: "action", component: "hands"},
		icon: "/img/sprites/combat/passives/yeyetiny.gif",
		
		events: {
			GLOBAL_onEvade: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(target) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
                    subject == user ||
                    hasStatus(user, "fear")
                ) return;

                let dullUtility = [2, 4, 4, 5, 5, 5, 6, 6, 6, 6]
				
                let utility = env.ACTIONS[user.actions[2]]
				if (user.actions.includes('special_player_dullsummon_low')) {
					utility = env.ACTIONS[user.actions[dullUtility.sample()]]
				}

                setTimeout(()=>{
                    useAction(this.status.affecting, utility, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "penance"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `PENANCE::${utility.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} siezes the opportunity as their ally misses! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
		},
		
		help: 'if alive, when an ally misses a foe, use utility'
	},
	
	env.STATUS_EFFECTS.metal_autonomous = { 
        slug: "metal_autonomous",
        name: "ACTION::Autonomous",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "metal", },
        icon: "/img/sprites/combat/passives/ceyetiny.gif",
		inUse: false, //this is a surprise tool that will help us later
        
        events: {
			onTurn: function() {
				env.STATUS_EFFECTS.metal_autonomous.inUse = false //tell the game it hasn't been used yet
			},
			
            onCrit: function({subject, origin, attack, beneficial}) {
				if(env.STATUS_EFFECTS.metal_autonomous.inUse) return //if autonomous has already been used this turn, don't use it again
				else env.STATUS_EFFECTS.metal_autonomous.inUse = true //tell the game when it's been used
                let user = this.status.affecting
                if(beneficial || user.team.members.includes(subject) || user.state == "dead" || hasStatus(user, "fear")) return;

                let primary = env.ACTIONS[user.actions[0]]
				if (hasStatus(this.status.affecting, "windup")) (primary = env.ACTIONS[user.windupActions[0]])
                
                setTimeout(()=>{
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `AUTONOMOUS::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} grasps the opportunity! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    
                    useAction(user, primary, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "autonomous"})
                }, 500)
            }
        },

        help: "when critting a foe, use primary action on that foe"
    },
	
	env.STATUS_EFFECTS.pain_rampage = { 
        slug: "pain_rampage",
        name: "ACTION::Rampage",
        passive: true,
        beneficial: true,
        impulse: {type: "action", component: "pain",},
        icon: "/img/sprites/combat/passives/meyetiny.gif",
        
        events: {
            //in evades, the 'subject' is the origin of the attack <- really hoping this holds true for critical hits cause boy howdy if it doesn't i am FUCKED (it does !! yaaaay :D)
            GLOBAL_onCritStruck: function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
					target == user ||
					hasStatus(user, "fear")
                ) return;
				
                let primary = env.ACTIONS[user.actions[0]]
				if (user.windupActions) (primary = env.ACTIONS[user.windupActions[0]])
				
				setTimeout(()=>{
                    env.GENERIC_ACTIONS.teamWave({
						team: user.enemyTeam,
						exec: (actor, i) => {
							env.GENERIC_ACTIONS.singleTarget({
								action: primary,
								user,
								target: actor,
								genExec: ({user, target})=> {
									primary.exec(user, target)
								},
							})
						}
					})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `RAMPAGE::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} lashes out against their foes! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.5)
            }
        },

        help: 'if alive, when an ally receives a critical hit, use primary over enemy team'
    },

	env.STATUS_EFFECTS.fated_flesh = {
		slug: "fated_flesh",
		name: "FATED::Flesh",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/fated_claws.gif",
		impulse: {type: "fated", component: "flesh"},
		events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "flesh") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "flesh") this.status.power += 2
                }
            },
			
			onHit: function({subject, origin, attack, beneficial}) {
				if(!this.status.power || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                
                addStatus({target: subject, origin, status: "rot", length: this.status.power})
                
                sendFloater({
                    target: this.status.affecting,
                    type: "arbitrary",
                    specialClass: "fate",
                    arbitraryString: "FATE::FLESH",
                })
                
                setTimeout(()=>{
                    readoutAdd({
                        message: `${origin.name} inflicts ${subject.name} with additional rot! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
		},
		help: "per humor of flesh in this shell::\n+1T:ROT on all attacks\n+1 max hallucinations"
	}

	env.STATUS_EFFECTS.fated_dull = {
		slug: "fated_dull",
		name: "FATED::Dull",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/fated_light.gif",
		impulse: {type: "fated", component: "dull"},
		events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "dull") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "dull") this.status.power += 2
                }

                this.status.outgoingFlatCrit = 0.05 * this.status.power;
            }
		},
		help: "per humor of dull in this shell::\n+5% base crit chance on all actions\n+5% DULL PORTAL::SPECIAL success rate"
	},

	env.STATUS_EFFECTS.fated_spirestone = {
		slug: "fated_spirestone",
		name: "FATED::Spirestone",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/fated_bone.gif",
		impulse: {type: "fated", component: "spirestone"},
		events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "spirestone") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "spirestone") this.status.power += 2
                }

                this.status.incomingCrit = 0.05 * this.status.power;
			},
			onTurn: function() {
				if(hasStatus(this.status.affecting,"focused")) {
					addStatus({target: this.status.affecting, status: "focused", length: this.status.power});
				}
			}
		},
		help: "per humor of spirestone in this shell::\n-10% incoming crit%\nreceive +1T:FOCUSED while FOCUSED"
	},

	env.STATUS_EFFECTS.fated_hands = {
        slug: "fated_hands",
        name: "FATED::Hands",
        passive: true,
        beneficial: true,
        icon: "/img/sprites/combat/passives/fated_eyes.gif",
        impulse: {
            type: "fated", 
            component: "hands",
        },
        
        events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "hands") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "hands") this.status.power += 2
                }
            },

            onHit: function({subject, origin, attack, beneficial}) {
                if(!this.status.power || beneficial || origin.team.members.includes(subject) || origin.state == "dead" || subject.state == "dead") return;
                let effectChance = Math.random()
				if(effectChance > (0.1 * this.status.power)) return;
                
                let rand = Math.random()
                let status
                if(rand < 0.25) {
                    addStatus({target: subject, origin, status: "puncture", length: 3})
                    status = "puncture"
                    
                } else if(rand < 0.5) {
                    addStatus({target: subject, origin, status: "cursed", length: 2})
                    status = "cursed"

                } else if(rand < 0.75) {
                    addStatus({target: subject, origin, status: "vulnerable", length: 2})
                    status = "vulnerable" 
					
                } else {
					addStatus({target: subject, origin, status: "stun", length: 1})
					status = "stun"
				}
                
                setTimeout(()=>{
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "fate",
                        arbitraryString: "FATE::HANDS",
                    })
                    
                    readoutAdd({
                        message: `${origin.name} inflicts ${subject.name} with ${status}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }
        },

        help: "per humor of hands in this shell::\n+10% chance for (3T:PUNCTURE/2T:CURSED/2T:VULNERABLE/1T:STUN) on hit\n+10% chance to guarantee beneficial tarot card draw"
    },
	
	env.STATUS_EFFECTS.fated_metal = {
		slug: "fated_metal",
		name: "FATED::Metal",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/fated_bone.gif",
		impulse: {type: "fated", component: "metal"},
		events: {
            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "metal") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "metal") this.status.power += 2
                }
                
            },
			onTurn: function() {
				if(hasStatus(this.status.affecting,"windup")) (this.status.outgoingCrit = 1 * this.status.power);
			}
		},
		help: "per humor of metal in this shell::\n+100% outgoing crit% while under WINDUP\n+1 max golems"
	},
	
	env.STATUS_EFFECTS.fated_pain = {
		slug: "fated_pain",
		name: "FATED::Pain",
		passive: true,
		beneficial: true,
		icon: "/img/sprites/combat/passives/fated_claws.gif",
		impulse: {type: "fated", component: "pain"},
		events: {
			onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;
                
                this.status.power = 0
                if(this.status.affecting?.member?.components) for (const [slotName, slotContents] of Object.entries(this.status.affecting.member.components)) {
                    if(slotContents == "pain") this.status.power++
                }

                if(this.status.affecting?.member?.augments) for (const augmentSlug of this.status.affecting.member.augments) {
                    let augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                    if(augment?.component) if(augment.component[1] == "pain") this.status.power += 2 //sidenote::what the hell happens inbetween the two if statements here?? i just noticed there's like nothing there how does it WORK
                }
				
				let currentMaxHp = this.status.affecting.maxhp //dear corru the works why is it not maxHp
				let maxHpAdd = 0
                maxHpAdd = 2 * (0 + this.status.power)
				currentMaxHp = this.status.affecting.maxhp + maxHpAdd
				this.status.affecting.maxhp = currentMaxHp
				updateStats({actor: this.status.affecting})
            },
		},
		help: "per humor of pain in this shell::\n+2 max HP during combat\n+1 max husks"
	},

    env.STATUS_EFFECTS.hardened = { 
        slug: "hardened",
        name: "Hardened",
		outgoingToHit: 1,
		outgoingCrit: 2,
		outgoingFlat: 1,
        help: "+100% outgoing hit%, +200% outgoing crit% and +1 outgoing base damage/heal while BP > 0\nremoves weakened\nremoved upon barrier loss",
		icon: "https://corru.observer/img/sprites/combat/statuses/repairs.gif",
        infinite: true,
        beneficial: true,
		opposite: "fractalline",
		removes: ["fractalline"],
        
        events: {
            onTurn: function() {
				let hardened = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "hardened"))
                console.log('in hardened')
                if(this.status.affecting.bp > 0) {
					hardened.forEach(actor => {
						reactDialogue(this.status.affecting, 'regen');
						removeStatus(this.status.affecting, "weakened")
						play('guard', 0.5);
					} )
					updateStats({actors: hardened})
                } else {
					hardened.forEach(actor => {
						console.log('removing hardened', this.status.affecting.bp)
						removeStatus(this.status.affecting, "hardened")
					} )
					updateStats({actors: hardened})
                }
            },

            onCombatHit: function() {
				let hardened = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "hardened"))
                console.log('in hardened damage', this.status.affecting.bp)
                if(this.status.affecting.bp <= 0) {
                    console.log('removing hardened')
					hardened.forEach(actor => {
						removeStatus(this.status.affecting, "hardened")
						updateStats({actors: hardened})
					} )
                }
            },
		}
    },

    env.STATUS_EFFECTS.fractalline = { 
        slug: "fractalline",
        name: "Fractalline",
        help: "+2T:WEAKENED/turn while BP > 0\nremoved upon barrier loss",
        infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/million_teeth.gif",
        opposite: "hardened",
        removes: ["hardened"],
        
        events: {
            onTurn: function() {
                if(this.status.affecting.bp > 0) {
                    addStatus({target: this.status.affecting, origin: false, status: "weakened", length: 2}); 
                    play('croak', 0.5);
                } else {
                    removeStatus(this.status.affecting, "fractalline")
                }
            },

            onCombatHit: function() {
                if(this.status.affecting.bp <= 0) {
                    removeStatus(this.status.affecting, "fractalline")
                }
            },
        }
    },

    env.STATUS_EFFECTS.favored = { 
        slug: "favored",
        name: "Favored",
        outgoingToHit: 0.75,
        outgoingCrit: 2,
		incomingToHit: -0.5,
		incomingCrit: -0.5,
        beneficial: true,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/favoredstatus3_amber.png",
		tickType: "onTurnEnd",
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'focused') },
        },
        help: "+75% hit%, +200% crit%, -50% incoming hit%, crit%",
        removes: ["cursed"],
        opposite: "cursed"
    },

    env.STATUS_EFFECTS.cursed = { 
        slug: "cursed",
        name: "Cursed",
        incomingToHit: 0.75,
        incomingCrit: 2,
		outgoingToHit: -0.5,
		outgoingCrit: -0.5,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/cursedstatus2_amber.png",
		tickType: "onTurnEnd",
        help: "+75% incoming hit%, +200% incoming crit%, -50% outgoing hit%, crit%",
        removes: ["favored"],
        opposite: "favored"
    },

	env.STATUS_EFFECTS.infallible = {
		slug: "infallible",
		name: "Infallible",
		help: "actor is immune to stun, fear, and weakened\nremoved upon focused loss",
		infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/hyperfocus.gif",
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "focused")) {
                    removeStatus(this.status.affecting, "infallible")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "focused") removeStatus(this.status.affecting, "infallible")
            },
		
			onTurn: function() {
					if(!this.status.affecting.minotaursMazeContingencyPlan) {
						if(!this.status.affecting.statusImmunities) {
							this.status.affecting.statusImmunities = ["stun", "fear", "weakened"]; //the game will shit itself if you add an immunity to someone who doesnt have them defined, so we define them here if they dont have any
							this.status.affecting.minotaursMazeContingencyPlan = true //surprise tool that will help us later
						} else if(!this.status.affecting.statusImmunities.includes("stun")) { //if they arent already immune to stun, makes them
							this.status.affecting.statusImmunities.push("stun", "fear", "weakened")
							this.status.affecting.minotaursMazeContingencyPlan = true
						}
					}
				updateStats({actor: this.status.affecting})
			} 
		}
	},
	
	env.STATUS_EFFECTS.chosen = {
		slug: "chosen",
		name: "Chosen",
		help: "+75% hit%, +200% crit%, -45% incoming hit%, crit%, +100% outgoing damage/heal\nremoved upon favored loss",
		outgoingToHit: 0.75,
        outgoingCrit: 2,
		incomingToHit: -0.45,
		incomingToCrit: -0.45,
		outgoingMult: 1,
		icon: "https://corru.observer/img/sprites/combat/statuses/hyperfocus.gif",
		infinite: true,
		removes: ["forsaken"],
		opposite: "forsaken",
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "favored")) {
                    removeStatus(this.status.affecting, "chosen")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "favored") removeStatus(this.status.affecting, "chosen")
            },
		}
	},
	
	env.STATUS_EFFECTS.forsaken = {
		slug: "forsaken",
		name: "Forsaken",
		help: "+75% incoming hit%, +200% incoming crit%, -45% outgoing hit%, crit%, +100% incoming damage/heal\nremoved upon cursed loss",
		incomingToHit: 0.75,
        incomingCrit: 2,
		outgoingToHit: -0.45,
		outgoingToCrit: -0.45,
		incomingMult: 1,
		icon: "https://corru.observer/img/sprites/combat/statuses/madness.gif",
		infinite: true,
		removes: ["chosen"],
		opposite: "chosen",
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "cursed")) {
                    removeStatus(this.status.affecting, "forsaken")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "cursed") removeStatus(this.status.affecting, "forsaken")
            },
		}
	},

    env.ACTIONS.amplifier_attack = {
        slug: "amplifier_attack",
        name: "Broadcast",
        type: 'target',
        desc: "'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'",
        anim: "wobble",
        help: "75% -2HP +1T:PUNCTURE, 30%C x2 +1T:PUNCTURE + (TARGET TEAM::-1HP +2T:VULNERABLE)",
        usage: {
            act: "%USER WARPS STRANGELY",
            crit: "%TARGET'S TEAM FEELS ILL",
            hit: "%TARGET'S FLESH REVOLTS",
            miss: "%TARGET RECOILS SAFELY"
        },
        accuracy: 0.75,
        crit: 0.3,
        amt: 2,
        exec: function(user, target) {
            content.classList.add('painprep', 'painhalf')
            setTimeout(()=>{content.classList.add('painmode')}, 100)
            setTimeout(()=>{content.classList.remove('painmode')}, 2000)
            setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 3000)

            env.rpg.classList.remove('incoherentbg')

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitStatus: {name: 'puncture', length: 1}, 
				critStatus: {name: 'puncture', length: 1},
                
                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: target.team,
                    exec: (actor, i)=>{
                        combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
                        addStatus({target: actor, status: "vulnerable", length: 2}); 
                        play("talksignal", 0.75)
                    }
                })
            })
        }
    },

	env.STATUS_EFFECTS.hands_malfunction = { 
		slug: "hands_malfunction",
		name: "Amplifier",
		help: "all targeted actions have a 10% + (5%*T:VULNERABLE) chance to become BROADCAST\nBROADCAST::(75% -2HP +1T:PUNCTURE, 30%C x2 +1T:PUNCTURE + (TARGET TEAM::-1HP +2T:VULNERABLE))\nremoved on vulnerable loss",
		beneficial: false,
		infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/critical_flaw.gif",
		
		events: {
			onBeforeAction: function(context) {
				if(!context.settings.action.type.includes("target")) return;
				let pow = hasStatus(this.status.affecting, "vulnerable");
				if(!hasStatus(this.status.affecting, "vulnerable")) {
                    removeStatus(this.status.affecting, "hands_malfunction")
                    return
                }
				
				// alter action maybe
				if(Math.random() < (0.10 + (pow * 0.05))) {

					context.settings.action = env.ACTIONS["amplifier_attack"]
					let subject = context.settings.user

					sendFloater({
						target: subject,
						type: "arbitrary",
						arbitraryString: "AMPLIFIER!",
						isGood: false,
						size: 2,
					})

					readoutAdd({
						message: `${subject.name} is siezed by the signal! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
						name: "sourceless", 
						type: "sourceless combat minordetail",
						show: false,
						sfx: false
					})
				}
			},
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "vulnerable") removeStatus(this.status.affecting, "hands_malfunction")
            },
		}
	}

    env.STATUS_EFFECTS.joy = { 
        slug: "joy",
        name: "Joy",
        beneficial: true,
        infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/unnatural_speed.gif",
        events: {
            onTurn: function() { 
                reactDialogue(this.status.affecting, 'surge') 
                delete this.status.justGotSurge
            },
            
            onAction: function({user, action, target, beingUsedAsync}) {
                if(this.status.justGotSurge || beingUsedAsync || ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart))) return;
                
                setTimeout(()=>{
            
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        arbitraryString: "JOY!",
                    })

                    readoutAdd({
                        message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })

                    useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "joy"})
                }, 500)
            },

            onCreated: function({statusObj}) {
                if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
            },
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "focused")) {
                    removeStatus(this.status.affecting, "joy")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "focused") removeStatus(this.status.affecting, "joy")
            },
        },
        help: "use next active action twice\nremoved on focused loss"
    },

	env.ACTIONS.stumble = {
		slug: "stumble",
		name: "Stumble",
		type: 'autohit',
		desc: "'suffer from despair'",
		anim: "skitter",
		help: "-2HP, +1T:STUN",
		usage: {
			act: "%USER CAN ONLY WEEP"
		},
		acc: 100,
		crit: -1,
		exec: function(user, target) {
			combatHit(user, {amt: 2, acc: this.accuracy, crit: this.crit, origin: user})
			addStatus({target: user, status: "stun", length: 1, noReact: true}); 
			advanceTurn(user)
			return 'nothing';
		}
	}

	env.STATUS_EFFECTS.despair_malfunction = { 
		slug: "despair_malfunction",
		name: "Despair",
		help: "all actions have a 50% chance to become STUMBLE\nSTUMBLE::(SELF:: -2HP, +1T:STUN)\nremoved on fear loss",
		beneficial: false,
		infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/madness.gif",
		
		events: {
			onBeforeAction: function(context) {
				
				if(!hasStatus(this.status.affecting, "fear")) {
                    removeStatus(this.status.affecting, "despair_malfunction")
                    return
                }
				
				// alter action maybe
				if(Math.random() < (0.50)) {

					context.settings.action = env.ACTIONS["stumble"]
					let subject = context.settings.user

					sendFloater({
						target: subject,
						type: "arbitrary",
						arbitraryString: "DESPAIR!",
						isGood: false,
						size: 2,
					})

					readoutAdd({
						message: `${subject.name} falls to the ground! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
						name: "sourceless", 
						type: "sourceless combat minordetail",
						show: false,
						sfx: false
					})
				}
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "fear") removeStatus(this.status.affecting, "despair_malfunction")
            },
		}
	}
	
	env.STATUS_EFFECTS.winderup = {
        slug: "winderup",
        name: "Windup+",
        help: "additional +100% incoming crit, preparing great attack, removed on windup loss",
        beneficial: true,
        incomingCrit: 1,
        infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/windup.gif",
        enableWindup: true,
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "windup")) {
                    removeStatus(this.status.affecting, "winderup")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "windup") removeStatus(this.status.affecting, "winderup")
            },
		},
    }
	
	env.STATUS_EFFECTS.windestup = {
        slug: "windestup",
        name: "Windup++",
        help: "additional +200% incoming crit, preparing great attack, removed on windup loss",
        beneficial: true,
        incomingCrit: 2,
        infinite: true,
        enableWindup: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/windup.gif",
		removes: ["winderup"],
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "windup")) {
                    removeStatus(this.status.affecting, "windestup")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "windup") removeStatus(this.status.affecting, "windestup")
            },
		}
    }
	
	env.STATUS_EFFECTS.final_windup = {
        slug: "final_windup",
        name: "Windup+++",
        help: "additional +300% incoming crit, preparing massive attack, removed on windup loss",
        beneficial: true,
        incomingCrit: 3,
        infinite: true,
        enableWindup: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/windup.gif",
		removes: ["windestup"],
		
		events: {
			onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "windup")) {
                    removeStatus(this.status.affecting, "final_windup")
                    return
                }
			},
			
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "windup") removeStatus(this.status.affecting, "final_windup")
            },
		}
    }

	env.STATUS_EFFECTS.chitinous = {
        slug: "chitinous",
        name: "Chitinous",
        help: "return 50% incoming damage to attacker (min: 1) and -1 base incoming damage/heal while bp > 0\nremoves open wound and siphon\nremoved on barrier loss",
        beneficial: true,
		infinite: true,
		incomingFlat: -1,
		icon: "https://corru.observer/img/sprites/combat/statuses/spikes.gif",
        events: {
			onTurn: function() {
				let chitinous = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "chitinous"))
                console.log('in chitinous')
                if(this.status.affecting.bp > 0) {
					chitinous.forEach(actor => {
						reactDialogue(this.status.affecting, 'regen');
						removeStatus(this.status.affecting, "open_wound")
						removeStatus(this.status.affecting, "siphon")
						play('mend', 0.5);
					} )
					updateStats({actors: chitinous})
                } else {
					chitinous.forEach(actor => {
						console.log('removing chitinous', this.status.affecting.bp)
						removeStatus(this.status.affecting, "chitinous")
					} )
					updateStats({actors: chitinous})
                }
            },

            onCombatHit: function() {
				let chitinous = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "chitinous"))
                console.log('in chitinous damage', this.status.affecting.bp)
                if(this.status.affecting.bp <= 0) {
                    console.log('removing chitinous')
					chitinous.forEach(actor => {
						removeStatus(this.status.affecting, "chitinous")
						updateStats({actors: chitinous})
					} )
                }
            },
			
            onStruck: function({subject, attack, beneficial}) { 
                if(beneficial) return;
				let fated = this.status.affecting.statusEffects.find(status => status.slug == "fated_bone")
                let returnDmg = Math.max(Math.floor(attack * 0.5), fated ? fated.power + 1 : 1)

                setTimeout(()=>{
                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "CHITINOUS!",
                        isGood: false,
                        size: 1,
                    })

                    readoutAdd({
                        message: `${subject.name} receives ${Math.abs(returnDmg)} damage via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })

                    forcePlay("stab", 0.7, 0.8)
                    combatHit(subject, {amt: returnDmg, autohit: true, crit: 0, origin: false, redirectable: false})
                }, env.ADVANCE_RATE * 0.2)
            },
        }
    }
	
	env.STATUS_EFFECTS.denatured = { 
        slug: "denatured",
        name: "Denatured",
        incomingMult: 2,
        outgoingMult: 2,
        beneficial: true,
        tickType: "onTurnEnd",
		opposite: "intangible",
		icon: "https://corru.observer/img/sprites/combat/statuses/destabilized.gif",
		removes: ["destabilized", "intangible"],
        
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'destabilized') },
        },

        help: "+200% incoming/outgoing damage/heal",
    }
	
	env.STATUS_EFFECTS.intangible = { 
        slug: "intangible",
        name: "Intangible",
        incomingMult: -1,
        outgoingMult: -1,
        beneficial: false,
        tickType: "onTurnEnd",
		opposite: "denatured",
		icon: "https://adrfurret.neocities.org/corrumods/img/sprites/combat/statuses/numb.gif",
		removes: ["destabilized", "denatured"],
        
        events: {
            onTurn: function() { reactDialogue(this.status.affecting, 'stun') },
        },

        help: "-100% incoming/outgoing damage/heal",
    }

	env.STATUS_EFFECTS.serrations = {
        slug: "serrations",
        name: "Serrations",
        help: "return 100% incoming damage to attacker, min:1",
        beneficial: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/spikes.gif",
		opposite: "siphon_mega",
        removes: ["siphon", "spikes", "siphon_mega"],
        events: {
            onStruck: function({subject, attack, beneficial}) { 
                if(beneficial) return;
                let fated = this.status.affecting.statusEffects.find(status => status.slug == "fated_bone")
                let returnDmg = Math.max(Math.floor(attack), fated ? fated.power + 1 : 1)

                setTimeout(()=>{
                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "SERRATED!",
                        isGood: false,
                        size: 1,
                    })

                    readoutAdd({
                        message: `${subject.name} receives ${Math.abs(returnDmg)} damage via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })

                    forcePlay("stab", 0.6, 0.7)
                    combatHit(subject, {amt: returnDmg, autohit: true, crit: 0, origin: false, redirectable: false})
                }, env.ADVANCE_RATE * 0.2)
            },
        }
    }

    env.STATUS_EFFECTS.siphon_mega = {
        slug: "siphon_mega",
        name: "Veilkfruit",
        help: "attacker receives 2HP, +2T:REGEN",
		icon: "https://corru.observer/img/sprites/combat/statuses/siphon.gif",
        opposite: "serrations",
        removes: ["spikes", "serrations", "siphon"],
        events: {
            onStruck: function({subject, attack}) {
                if(subject.state == "dead") return;

                let amt = 2 * (-1 - (hasStatus(this.status.affecting, "global_escalation") ? env.crittaMap.getModQty("global_escalation") || 0 : 0))
            
                sendFloater({
                    target: subject,
                    type: "arbitrary",
                    arbitraryString: "VEILKFRUIT!",
                })
                
                readoutAdd({
                    message: `${subject.name} receives +${amt}HP +2T:REGEN via <span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })

                addStatus({target: subject, origin: false, status: "regen", length: 2, noReact: true}); 
                combatHit(subject, {amt, autohit: true, crit: 0, origin: false, beneficial: true})
            },
        }
    }
	
	env.STATUS_EFFECTS.puppet = {
		slug: "puppet",
		name: "Puppet",
		help: "[[ORIGIN]] puppeteering outgoing actions\nall targeted offensive actions redirected towards a random ally, all targeted beneficial actions redirected towards a random foe\non turn, receive +1T:FEAR\nremoved on fear loss",
		infinite: true,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/puppetstatus2_amber.png",
		
		events: {
            onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "fear")) {
                    removeStatus(this.status.affecting, "puppet")
                    return
                }

                if(!context.settings.action.type.includes("target")) return;
                
                // alter target maybe
                if(Math.random() < 1) {
                    //select from whole turnorder
                    let subject = context.user
                    let oldTarget = context.settings.target
                    let newTarget = this.status.affecting.team.members.filter(actor=>actor.state != "dead" && actor.state != "lastStand" && actor.slug != oldTarget.slug)
					if(context.settings.action.beneficial) {
						newTarget = this.status.affecting.enemyTeam.members.filter(actor=>actor.state != "dead" && actor.state != "lastStand" && actor.slug != oldTarget.slug)
					}
                    if(newTarget.length) {
                        newTarget = newTarget.sample()
                    } else return;

                    console.log("old target was", context.settings.target, "new target is", newTarget)

                    context.settings.target = newTarget

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "PUPPET!",
                        isGood: false,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${subject.name}'s action upon ${oldTarget.name} is turned to ${newTarget.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "fear") removeStatus(this.status.affecting, "puppet")
            },
			
			onTurn: function() {
				addStatus({target: this.status.affecting, origin: false, status: "fear", length: 1});
			},
        }
	},
	
	env.STATUS_EFFECTS.puppet_mega = {
		slug: "puppet_mega",
		name: "Host Body",
		help: "[[ORIGIN]] assuming direct control\non turn, receive +1T:STUN\nremoved on fear loss",
		infinite: true,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/hostbodystatus2_amber.png",
		
		events: {
            onBeforeAction: function(context) {
                if(!hasStatus(this.status.affecting, "fear")) {
                    removeStatus(this.status.affecting, "puppet_mega")
                    return
                }

                if(!context.settings.action.type.includes("target")) return;
                
                // alter target maybe
                if(Math.random() < 1) {
                    //select from whole turnorder
                    let subject = context.user
                    let oldTarget = context.settings.target
                    let newTarget = this.status.affecting.team.members.filter(actor=>actor.state != "dead" && actor.state != "lastStand" && actor.slug != oldTarget.slug)
					if(context.settings.action.beneficial) {
						newTarget = this.status.affecting.enemyTeam.members.filter(actor=>actor.state != "dead" && actor.state != "lastStand" && actor.slug != oldTarget.slug)
					}
                    if(newTarget.length) {
                        newTarget = newTarget.sample()
                    } else return;

                    console.log("old target was", context.settings.target, "new target is", newTarget)

                    context.settings.target = newTarget

                    sendFloater({
                        target: subject,
                        type: "arbitrary",
                        arbitraryString: "PUPPET!",
                        isGood: false,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${subject.name}'s action upon ${oldTarget.name} is turned to ${newTarget.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "fear") removeStatus(this.status.affecting, "puppet_mega")
            },
			
			onTurn: function() {
				addStatus({target: this.status.affecting, origin: false, status: "stun", length: 1});
			},
        }
	},
	
	env.STATUS_EFFECTS.puppet_conjoined = {
        slug: "puppet_conjoined",
        name: "Husked",
        help: "share HP with all other husked entities",
        infinite: true,
        beneficial: true,
		icon: "https://file.garden/ZuXhuiZ9jXAsicUq/status%20effect%20icons/huskedstatus2_amber.png",
        events: {
            onCombatHit: function() {
                console.log('in player_conjoindamage', this.status.affecting.hp)
                if(!this.status.affecting.hp || this.status.affecting.hp == NaN) this.status.affecting.hp = 0;

                let puppet_conjoined = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "puppet_conjoined"))
                puppet_conjoined.forEach(actor => {
                    actor.hp = this.status.affecting.hp
                })

                updateStats({actors: puppet_conjoined})
            },
        }
    },
	
	env.ACTIONS.nothing_prone = {
        slug: "nothing_prone",
        name: "Get Up",
        type: 'autohit',
        desc: "'just nothing'",
        anim: "skitter",
        help: "NOTHING",
        usage: {
            act: "%USER TRIES TO GET UP"
        },
        exec: function(user, target) {
            advanceTurn(user)
        }
    },
	
	env.STATUS_EFFECTS.prone = { 
		slug: "prone",
		name: "Prone",
		help: "all actions have a 50% chance to become GET UP\nGET UP::(SELF::NOTHING)",
		beneficial: false,
		tickType: "onTurnEnd",
		icon: "https://corru.observer/img/sprites/combat/statuses/weakened.gif",
		
		events: {
			onBeforeAction: function(context) {
				// alter action maybe
				if(Math.random() < (0.50)) {

					context.settings.action = env.ACTIONS["nothing_prone"]
					let subject = context.settings.user

					sendFloater({
						target: subject,
						type: "arbitrary",
						arbitraryString: "PRONE!",
						isGood: false,
						size: 1,
					})

					readoutAdd({
						message: `${subject.name} cannot fight in this state! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
						name: "sourceless", 
						type: "sourceless combat minordetail",
						show: false,
						sfx: false
					})
				}
			},
		}
	}
		//the onAddStatus function does not work for reasons entirely unclear to me
		//we're on day three of trying to fix this damned thing, i'm scrapping it
	env.STATUS_EFFECTS.dull_sickness = {
		slug: "dull_sickness",
		name: "Dull Sickness",
		help: "+100% incoming damage/healing, -50% outgoing damage/healing",
		incomingMult: 1,
		outgoingMult: -0.5,
		ticktype: "onTurnEnd",
		level0: true,
		level1: false,
		level2: false,
		level3: false,
		events: {
			onAction: function({user, action, target}) {
				if(env.STATUS_EFFECTS.dull_sickness.level1 == true || env.STATUS_EFFECTS.dull_sickness.level2 == true || env.STATUS_EFFECTS.dull_sickness.level3 == true) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
				}
                if(action.slug.includes("dullsummon_medium") && env.STATUS_EFFECTS.dull_sickness.level1 == false) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
					env.STATUS_EFFECTS.dull_sickness.level1 = true
					env.STATUS_EFFECTS.dull_sickness.level2 = false
					env.STATUS_EFFECTS.dull_sickness.level3 = false
				} else if(action.slug.includes("dullsummon_high") && env.STATUS_EFFECTS.dull_sickness.level2 == false) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
					env.STATUS_EFFECTS.dull_sickness.level1 = true
					env.STATUS_EFFECTS.dull_sickness.level2 = true
					env.STATUS_EFFECTS.dull_sickness.level3 = false
				} else if(action.slug.includes("dullsummon_special") && env.STATUS_EFFECTS.dull_sickness.level3 == false) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
					env.STATUS_EFFECTS.dull_sickness.level1 = true
					env.STATUS_EFFECTS.dull_sickness.level2 = true
					env.STATUS_EFFECTS.dull_sickness.level3 = true
				}
            },
			onAddStatus: function({target, statusObj}) {
                let statusChange = false
				if(env.STATUS_EFFECTS.dull_sickness.level1 == true || env.STATUS_EFFECTS.dull_sickness.level2 == true || env.STATUS_EFFECTS.dull_sickness.level3 == true) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
				}
                switch(statusObj.slug) {
                    case "dull_sickness": // change da thing in accordance with last used dull portal action
                        statusObj.oldName = statusObj.name
						if(env.STATUS_EFFECTS.dull_sickness.level0 == true) {
							statusObj.name = "Dull Sickness"
							statusObj.help = "+100% incoming damage/healing, -50% outgoing damage/healing"
						}
						else if(env.STATUS_EFFECTS.dull_sickness.level1 == true && env.STATUS_EFFECTS.dull_sickness.level0 == false && env.STATUS_EFFECTS.dull_sickness.level2 == false && env.STATUS_EFFECTS.dull_sickness.level3 == false) {
							statusObj.name = "Dull Sickness+"
							statusObj.help = "+100% incoming damage/healing, -50% outgoing damage/healing + one of (1T:DESTABILIZED, 1T:WEAKENED, 1T:OPEN WOUND, 2T:VULNERABLE, 1T:PUNCTURE)/turn"
							statusChange = true
						} else if(env.STATUS_EFFECTS.dull_sickness.level2 == true && env.STATUS_EFFECTS.dull_sickness.level0 == false && env.STATUS_EFFECTS.dull_sickness.level3 == false) {
							statusObj.name = "Dull Sickness++"
							statusObj.help = "+100% incoming damage/healing, -50% outgoing damage/healing + two of (1T:DESTABILIZED, 1T:WEAKENED, 1T:OPEN WOUND, 2T:VULNERABLE, 1T:PUNCTURE)/turn"
							statusChange = true
						} else if(env.STATUS_EFFECTS.dull_sickness.level3 == true && env.STATUS_EFFECTS.dull_sickness.level0 == false) {
							statusObj.name = "Dull Sickness+++"
							statusObj.help = "+100% incoming damage/healing, -50% outgoing damage/healing + three of (1T:DESTABILIZED, 1T:WEAKENED, 1T:OPEN WOUND, 2T:VULNERABLE, 1T:PUNCTURE)/turn"
							statusChange = true
						}
                    break
                }
            },
			onTurn: function() {
				let user = this.status.affecting
				let rand = Math.random()
				let rand1 = Math.random()
				let rand2 = Math.random()
				if(env.STATUS_EFFECTS.dull_sickness.level1 == true || env.STATUS_EFFECTS.dull_sickness.level2 == true || env.STATUS_EFFECTS.dull_sickness.level3 == true) {
					env.STATUS_EFFECTS.dull_sickness.level0 = false
				}
				if(env.STATUS_EFFECTS.dull_sickness.level0 == true) return
				if(env.STATUS_EFFECTS.dull_sickness.level1 == true) {
					if(rand < 0.2) {
                        addStatus({target: user, origin: user, status: "destabilized", origin: user, length: 1}); 
                    } else if(rand < 0.4) {
                        addStatus({target: user, origin: user, status: "weakened", origin: user, length: 1}); 
                    } else if(rand < 0.6) {
                        addStatus({target: user, origin: user, status: "open_wound", origin: user, length: 1}); 
                    } else if(rand < 0.8) {
						addStatus({target: user, origin: user, status: "vulnerable", origin: user, length: 2}); 
					} else {
						addStatus({target: user, origin: user, status: "puncture", origin: user, length: 1});
					}
				}
				if(env.STATUS_EFFECTS.dull_sickness.level2 == true) {
					if(rand < 0.2) {
                        addStatus({target: user, origin: user, status: "destabilized", origin: user, length: 1}); 
                    } else if(rand1 < 0.4) {
                        addStatus({target: user, origin: user, status: "weakened", origin: user, length: 1}); 
                    } else if(rand1 < 0.6) {
                        addStatus({target: user, origin: user, status: "open_wound", origin: user, length: 1}); 
                    } else if(rand1 < 0.8) {
						addStatus({target: user, origin: user, status: "vulnerable", origin: user, length: 2}); 
					} else {
						addStatus({target: user, origin: user, status: "puncture", origin: user, length: 1});
					}
				}
				if(env.STATUS_EFFECTS.dull_sickness.level3 == true) {
					if(rand2 < 0.2) {
                        addStatus({target: user, origin: user, status: "destabilized", origin: user, length: 1}); 
                    } else if(rand2 < 0.4) {
                        addStatus({target: user, origin: user, status: "weakened", origin: user, length: 1}); 
                    } else if(rand2 < 0.6) {
                        addStatus({target: user, origin: user, status: "open_wound", origin: user, length: 1}); 
                    } else if(rand2 < 0.8) {
						addStatus({target: user, origin: user, status: "vulnerable", origin: user, length: 2}); 
					} else {
						addStatus({target: user, origin: user, status: "puncture", origin: user, length: 1});
					}
				}
			},
			onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "dull_sickness") {
					env.STATUS_EFFECTS.dull_sickness.level0 = true
				}
            },
		}
	}

    //summon specific statuses
env.STATUS_EFFECTS.player_ethereal = {
    slug: "player_ethereal",
    name: "Ethereal",
    help: "disappear on death",
    infinite: true,
	icon: "https://corru.observer/img/sprites/combat/statuses/ethereal.gif",
    events: {
        onDeath: function() {
            setTimeout(()=>midCombatAllyRemove(this.status.affecting), 200)
        },
    }
}

env.STATUS_EFFECTS.perma_vulnerable = { 
    slug: "perma_vulnerable",
    name: "Thin Membrane",
    infinite: true,
    incomingToHit: 1,
    incomingCrit: 2,
	icon: "https://corru.observer/img/sprites/combat/statuses/vulnerable.gif",
    events: {
        onTurn: function() { reactDialogue(this.status.affecting, 'vulnerable') },
    },
    help: "PASSIVE:: +100% incoming hit%, +200% incoming crit%",
}

env.STATUS_EFFECTS.perma_destabilized = { 
    slug: "perma_destabilized",
    name: "Irradiated",
    incomingMult: 1,
    outgoingMult: 1,
	icon: "https://corru.observer/img/sprites/combat/statuses/destabilized.gif",
    beneficial: true,
    infinite: true,
    
    events: {
        onTurn: function() { reactDialogue(this.status.affecting, 'destabilized') },
    },

    help: "PASSIVE:: +100% incoming/outgoing damage/heal",
}

env.STATUS_EFFECTS.floor_it = { 
    slug: "floor_it",
    name: "Floor It",
    beneficial: true,
    infinite: true,
	icon: "https://corru.observer/img/sprites/combat/statuses/surge.gif",
    events: {
        onTurn: function() { 
            reactDialogue(this.status.affecting, 'surge') 
            delete this.status.justGotSurge
        },
        
        onAction: function({user, action, target, beingUsedAsync}) {
            if(this.status.justGotSurge || beingUsedAsync || ["incoherent_", "steer", "floor", "windup", "intrusive"].some(slugpart => action.slug.includes(slugpart))) return;
            
            setTimeout(()=>{
        
                sendFloater({
                    target: user,
                    type: "arbitrary",
                    arbitraryString: "FLOOR IT!",
                })

                readoutAdd({
                    message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail", 
                    show: false,
                    sfx: false
                })

                for(let count = 0; count < 2; count += 1)
                    useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "floor_it"})
            }, 500)
            setTimeout(()=>{
        
                sendFloater({
                    target: user,
                    type: "arbitrary",
                    arbitraryString: "FLOOR IT!",
                })

                readoutAdd({
                    message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail", 
                    show: false,
                    sfx: false
                })

                for(let count = 0; count < 2; count += 1)
                    useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "floor_it"})
            }, 500)
            removeStatus(this.status.affecting, "floor_it")
        },

        onCreated: function({statusObj}) {
            if(statusObj.slug == this.status.slug) this.status.justGotSurge = true
        },
    },
    help: "use next active action thrice"
}

env.STATUS_EFFECTS.daemon_malfunction = { 
    slug: "daemon_malfunction",
    name: "Conflicted",
    help: "all targeted actions have a 10% chance to become RECALL\nRECALL::(SELF:: -1HP, +1T:STUN)",
    beneficial: false,
    infinite: true,
	icon: "https://corru.observer/img/sprites/combat/statuses/weakened.gif",
    
    events: {
        onBeforeAction: function(context) {
            if(!context.settings.action.type.includes("target")) return;
            
            // alter action maybe
            if(Math.random() < (0.10)) {

                context.settings.action = env.ACTIONS["recall"]
                let subject = context.settings.user

                sendFloater({
                    target: subject,
                    type: "arbitrary",
                    arbitraryString: "CONFLICTED!",
                    isGood: false,
                    size: 2,
                })

                readoutAdd({
                    message: `${subject.name}'s doesn't know what it's fighting for! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })
            }
        },
    }
}

env.STATUS_EFFECTS.dull_malfunction = { 
    slug: "dull_malfunction",
    name: "Faulty",
    help: "all actions have a 10% + (2%*T:DESTABILIZED) chance to become MALFUNCTION\nMALFUNCTION::(SELF:: -1HP, +1T:VULNERABLE)",
    beneficial: false,
    infinite: true,
	icon: "https://corru.observer/img/sprites/combat/statuses/vulnerable.gif",
    
    events: {
        onBeforeAction: function(context) {
            let pow = hasStatus(this.status.affecting, "destabilized");
            
            // alter action maybe
            if(Math.random() < (0.10 + (pow * 0.02))) {

                context.settings.action = env.ACTIONS["malfunction_good"]
                let subject = context.settings.user

                sendFloater({
                    target: subject,
                    type: "arbitrary",
                    arbitraryString: "FAULTY!",
                    isGood: false,
                    size: 2,
                })

                readoutAdd({
                    message: `${subject.name}'s breaks down! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail",
                    show: false,
                    sfx: false
                })
            }
        },
    }
}

env.STATUS_EFFECTS.high_priority = { //deceiving bulb reskin because that's surprisingly balanced
    slug: "high_priority",
    name: "High Priority",
    help: "prioritized as target over other allies",
    beneficial: false,
    infinite: true,
	icon: "https://corru.observer/img/sprites/combat/statuses/critical_flaw.gif",
            
    events: {
        onCreated: function({statusObj}) {
            if(statusObj.slug == "high_priority" && !this.status.initialized) {
                this.status.initialized = true
                this.status.affecting.priorityTarget = true
            }
        }
    },
}

    env.STATUS_EFFECTS.player_conjoined = {
        slug: "player_conjoined",
        name: "Conjoined",
        help: "share HP with all other conjoined entities",
        infinite: true,
        beneficial: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/conjoined.gif",
        events: {
            onCombatHit: function() {
                console.log('in player_conjoindamage', this.status.affecting.hp)
                if(!this.status.affecting.hp || this.status.affecting.hp == NaN) this.status.affecting.hp = 0;

                let player_conjoined = env.rpg.turnOrder.filter(actor=>hasStatus(actor, "player_conjoined"))
                player_conjoined.forEach(actor => {
                    actor.hp = this.status.affecting.hp
                })

                updateStats({actors: player_conjoined})
            },
        }
    },
	
	env.STATUS_EFFECTS.ominous_timer_short = { 
        slug: "ominous_timer_short",
        name: "Ominous Timer",
        skipTurn: true,
        infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/ominous_timer.gif",

        events: {
            onDeath: function() {
                clearInterval(this.status.countdown)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "ominous_timer_short") clearInterval(this.status.countdown)
            },

            onCreated: function({statusObj}) {
                console.log('created bomb with', statusObj)
                if(statusObj.slug != "ominous_timer_short" || this.status.timeRemaining) return;

                this.status.timeRemaining = 45
                let thisSprite = this.status.affecting.sprite
                let thisGuy = this.status.affecting
                let thisStatus = this.status

                function updateTimer() {  
                    if(thisSprite) thisSprite.querySelector(".timer").innerHTML = `<span>${thisStatus.timeRemaining}</span>`

                    if (thisStatus.timeRemaining === 0 && !thisStatus.exploded && env.rpg.active) {
                        clearInterval(thisStatus.countdown) 
                        thisStatus.exploded = true

                        thisGuy.actions = ["detonate_weak"]
                        thisGuy.sprite.classList.add("detonate-ready")

                        sendFloater({
                            target: thisGuy,
                            type: "arbitrary",
                            arbitraryString: "DETONATION IMMINENT",
                            size: 1.5,
                            isGood: false
                        })

                        readoutAdd({
                            message: `${thisGuy.name} is about to detonate!`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail",
                            show: false,
                            sfx: false
                        })

                        removeStatus(thisGuy, "ominous_timer_short")

                    } else {
                        if(!hasStatus(thisGuy, "stun") && !hasStatus(thisGuy, "hyperstun")) {
                            thisStatus.timeRemaining--
                        }

                    }
                }
            
                updateTimer() // Initial call to display the timer immediately
            
                this.status.countdown = setInterval(updateTimer, 1000)
            },
        },

        help: "unknown, asynchronous effect",
    },
	
	env.STATUS_EFFECTS.ominous_timer_long = { 
        slug: "ominous_timer_long",
        name: "Ominous Timer",
        skipTurn: true,
        infinite: true,
		icon: "https://corru.observer/img/sprites/combat/statuses/ominous_timer.gif",

        events: {
            onDeath: function() {
                clearInterval(this.status.countdown)
            },

            onRemoveStatus: function({target, removingStatusName}) {
                if(removingStatusName == "ominous_timer_long") clearInterval(this.status.countdown)
            },

            onCreated: function({statusObj}) {
                console.log('created bomb with', statusObj)
                if(statusObj.slug != "ominous_timer_long" || this.status.timeRemaining) return;

                this.status.timeRemaining = 180
                let thisSprite = this.status.affecting.sprite
                let thisGuy = this.status.affecting
                let thisStatus = this.status

                function updateTimer() {  
                    if(thisSprite) thisSprite.querySelector(".timer").innerHTML = `<span>${thisStatus.timeRemaining}</span>`

                    if (thisStatus.timeRemaining === 0 && !thisStatus.exploded && env.rpg.active) {
                        clearInterval(thisStatus.countdown) 
                        thisStatus.exploded = true

                        thisGuy.actions = ["detonate_mega"]
                        thisGuy.sprite.classList.add("detonate-ready")

                        sendFloater({
                            target: thisGuy,
                            type: "arbitrary",
                            arbitraryString: "DETONATION IMMINENT",
                            size: 1.5,
                            isGood: false
                        })

                        readoutAdd({
                            message: `${thisGuy.name} is about to detonate!`, 
                            name: "sourceless", 
                            type: "sourceless combat minordetail",
                            show: false,
                            sfx: false
                        })

                        removeStatus(thisGuy, "ominous_timer_long")

                    } else {
                        if(!hasStatus(thisGuy, "stun") && !hasStatus(thisGuy, "hyperstun")) {
                            thisStatus.timeRemaining--
                        }

                    }
                }
            
                updateTimer() // Initial call to display the timer immediately
            
                this.status.countdown = setInterval(updateTimer, 1000)
            },
        },

        help: "unknown, asynchronous effect",
    },


// COMBAT ACTORS
env.COMBAT_ACTORS.player_hallucination = {
    name: "»õGQàº3¾õ”cR%",
    maxhp: 3,
    hp: 3,
    actions: ["speak", "husk_attack_weak"],
    graphic: `
        <div class="sprite-wrapper hallucination" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img class="sprite basis" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                <img class="sprite base" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                <img class="sprite eyes" src="/img/sprites/combat/foes/hallucinations/akizet_eyes.png" id="%SLUG-sprite">
            </div>
            <div class="target" entity="»õGQàº3¾õ”cR%"></div>
        </div>
        `,
    reactions: {},
    initialStatusEffects: [["player_ethereal", 1]],
    turnCheck: "player_hallucinations",
    events: {
        onSpriteCreation: (sprite) => {
            if(!sprite) return

            let basis = sprite.querySelector('img.basis')
            let base = sprite.querySelector('img.base')
            let eyes = sprite.querySelector('img.eyes')

            if(env.hallucinator == "generic") {
                basis.src = `/img/sprites/combat/foes/hallucinations/gakvu.png`
                base.src = `/img/sprites/combat/foes/hallucinations/gakvu.png`
                eyes.src = `/img/sprites/combat/foes/hallucinations/gakvu_eyes.png`
            } else {
                basis.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                base.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}.png`
                eyes.src = `/img/sprites/combat/foes/hallucinations/${env.hallucinator}_eyes.png`                    
            }
        },
    }
}

    // warped daemons/special actors
env.COMBAT_ACTORS.player_dull_bstrdlight = {
    name: "Warped BSTRDlight",
    maxhp: 14,
    hp: 10,
    actions: ["spy_weak", "mend_weak", "special_mass_destabilize", "swipe_weak", "rez_player"],
    graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <div class="veilksprite bstrdlight">
                <img class="sprite" src="/img/sprites/combat/foes/bstrdlampbase.gif" id="%SLUG-sprite">
            </div>
            <div class="target" entity="bstrdlight"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_pawn = {
    name: "WRPD WRK",
    specialClass: "daemonactor",
    maxhp: 7,
    actions: ["revise_weak", "mad_claw_weak", "evade_weak"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="wrk"></div>
            <figure class="daemon pawn accurate-position"> 
                <img src="/img/sprites/daemons/pawn/base.gif">
                <div class="eye"></div>
                <div class="scraps noimg">
                    <div class="scrap"></div>
                    <div class="scrap"></div>
                    <div class="scrap"></div>
                    <div class="scrap"></div>
                    <div class="scrap"></div>
                </div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_knight = {
    name: "WRPD CLW",
    specialClass: "daemonactor",
    maxhp: 10,
    actions: ["cripple_weak", "exploit_weak", "surge_weak"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="clw"></div>
            <figure class="daemon rook accurate-position">
                <img src="/img/sprites/daemons/rook/body.gif">
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="leftarm">
                    <div class="downarm">
                        <div class="upclaw"></div>
                        <div class="downclaw"></div>
                    </div>
                </div>
                <div class="rightarm">
                    <div class="downarm">
                        <div class="upclaw"></div>
                        <div class="downclaw"></div>
                    </div>
                </div>
            </figure>
            
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_bishop = {
    name: "WRPD NET",
    specialClass: "daemonactor",
    maxhp: 8,
    actions: ["speak_weak", "parasite_weak", "empower", "rez_player"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="net"></div>
            <figure class="daemon bishop accurate-position">
                <img src="/img/sprites/daemons/bishop/base.gif">
                <div class="eye"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction"]],
}

env.COMBAT_ACTORS.player_dull_critta_rook = {
    name: "WRPD ENFC",
    specialClass: "daemonactor",
    maxhp: 14,
    actions: ["enforce", "focused_guard"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="enfc"></div>
            <figure class="daemon knight accurate-position">
                <img src="/img/sprites/daemons/knight/body.gif">
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="uparm">
                    <div class="downarm">
                        <div class="upclaw"></div>
                        <div class="downclaw"></div>
                    </div>
                </div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_queen = {
    name: "WRPD SEER",
    specialClass: "daemonactor",
    maxhp: 15,
    actions: ["windup"],
    windupActions: ["special_rule_weak", "daemon_wound"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="seer"></div>
            <figure class="daemon queen accurate-position">
                <img src="/img/sprites/daemons/queen/core.gif">
                <div class="eye"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_king = {
    name: "WRPD ARCHN",
    specialClass: "daemonactor",
    maxhp: 17,
    actions: ["windup"],
    windupActions: ["special_judgement_weak"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="archn"></div>
            <figure class="daemon king accurate-position">
                <img src="/img/sprites/daemons/king/angles.gif">
                <img src="/img/sprites/daemons/king/angles.gif">
                <div class="box center"></div>
                <div class="box outer"></div>
                <div class="ring"></div>
                <div class="eye"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_dragon = {
    name: "WRPD IDL",
    specialClass: "daemonactor",
    maxhp: 20,
    actions: ["special_player_daemon_guard"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="seer"></div>
            <figure class="daemon queen accurate-position">
                <img src="/img/sprites/daemons/queen/core.gif">
                <div class="eye"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_unicorn = {
    name: "WRPD MOD",
    specialClass: "daemonactor",
    maxhp: 10,
    actions: ["special_daemon_fullauto","daemon_floor_it","daemon_windup"],
    windupActions: ["special_daemon_fullerauto"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="clw"></div>
            <figure class="daemon rook accurate-position">
                <img src="/img/sprites/daemons/rook/body.gif">
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="eye"></div>
                <div class="leftarm">
                    <div class="downarm">
                        <div class="upclaw"></div>
                        <div class="downclaw"></div>
                    </div>
                </div>
                <div class="rightarm">
                    <div class="downarm">
                        <div class="upclaw"></div>
                        <div class="downclaw"></div>
                    </div>
                </div>
            </figure>
            
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_princess_defensive = {
    name: "WRPD GPU",
    specialClass: "daemonactor",
    maxhp: 8,
    actions: ["daemon_tesselate", "daemon_plot", "special_daemon_enact_gpu"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="net"></div>
            <figure class="daemon bishop accurate-position">
                <img src="/img/sprites/daemons/bishop/base.gif">
                <div class="eye"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_princess_offensive = {
    name: "WRPD CPU",
    specialClass: "daemonactor",
    maxhp: 8,
    actions: ["daemon_cull", "daemon_plot", "special_daemon_enact_cpu"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="net"></div>
            <figure class="daemon bishop accurate-position">
                <img src="/img/sprites/daemons/bishop/base.gif">
                <div class="eye"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_princess_hybrid = {
    name: "WRPD MTHRBRD",
    specialClass: "daemonactor",
    maxhp: 15,
    actions: ["special_greater_cull", "special_greater_tesselate", "surge"],
    graphic: `
        <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
            <div class="target" entity="net"></div>
            <figure class="daemon bishop accurate-position">
                <img src="/img/sprites/daemons/bishop/base.gif">
                <div class="eye"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
                <div class="tendril"></div>
            </figure>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    events: {
        onSpawn: () => change("daemon", "saw")
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_critta_superknight = {
    name: "WRPD DEL",
	specialClass: "daemonactor",
    maxhp: 15,
    hp: 15,
    actions: ["windup"],
    windupActions: ["daemon_smash"],
    graphic: `
        <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="archival golem"></div>
        </div>
        `,
    reactions: { //SILENT CREATURE
    },
    initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1]],
}

env.COMBAT_ACTORS.critta_superknight = {
    name: "DEL",
	specialClass: "daemonactor",
    maxhp: 45,
    hp: 45,
    actions: ["windup"],
    windupActions: ["daemon_smash"],
    graphic: `
        <div class="sprite-wrapper daemon_del superknightsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="https://file.garden/ZuXhuiZ9jXAsicUq/bstrdsing_wholesprite-DEL-gifver.gif" style="max-height: 405px; max-width: 945px;" id="%SLUG-superknightsprite-whole" class="sprite superknightsprite-whole">

            <div class="target" entity="archival golem"></div>
        </div>
        `,
    reactions: { //SILENT CREATURE
    },
}

    env.COMBAT_ACTORS.player_dull_critta_spawner = {
        name: "WRPD SPWN",
        maxhp: 166,
        specialClass: "mainfoe daemonactor",
        actions: ["special_chant_mega_weak"],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper daemonsprite jester" id="%SLUG-sprite-wrapper">
                <div class="target" entity="spwn"></div>
                <figure class="daemon spawner" style="animation-delay: -4s">
                    <img src="/img/sprites/daemons/spawner/body.gif">
                    <img src="/img/sprites/daemons/spawner/body.gif">
                </figure>
            </div>
            `,
        events: {
            onSpawn: () => change("daemon", "saw")
        },
		initialStatusEffects: [["player_ethereal", 1],["daemon_malfunction", 1],["high_priority", 1]],
    }

    env.COMBAT_ACTORS.player_critta_spawner_bee = {
        name: "IDEA",
        specialClass: "daemonactor",
        maxhp: 10,
        actions: ["husk_attack_rot", "surge"],
        initialStatusEffects: [["ethereal", 1]],
        turnCheck: "genericEthereal",
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="idea"></div>
                <figure class="daemon bee"><div class="sides"><span></span><span></span><span></span><span></span><span></span><span></span></div></figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
    }

    //warped boss actors
env.COMBAT_ACTORS.player_dull_movefriend = {
    slug: "player_dull_movefriend",
    name: "Warped Movefoe",
    maxhp: 20,
    hp: 20,
    statusImmunities: ["stun"],
    actions: ["movefriend_attack_weak", "special_mass_destabilize", "special_playershelf_annihilate_movefriend","special_player_movefriendsummon"],
    graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <div class="lifter sprite"><figure></figure></div>
            <div class="target" entity="movefoe"></div>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1],["high_priority", 1]],
}

env.COMBAT_ACTORS.player_dull_tendrils = {
    name: "Warped Tendril",
    turnCheck: "tendrils",
    maxhp: 3,
    hp: 3,
    actions: ["swipe_weak"],
    graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/sprites/combat/foes/tendrils.gif" id="%SLUG-sprite">
            <div class="target" entity="tendrils"></div>
        </div>
        `,
    reactions: {},
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_bstrdshelf = {
    name: "Warped Pain Shelf",
    maxhp: 24,
    hp: 20,
    actions: ["special_playershelf_annihilate_painshelf"],
    graphic: `
        <div class="sprite-wrapper bstrdshelf" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/sprites/combat/foes/archivalfoea.gif">
            <div class="target" entity="pain shelf"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1],["high_priority", 1]],
}

env.COMBAT_ACTORS.player_dull_gungolem = {
    slug: "player_dull_gungolem",
    name: "Gun Golem",
    maxhp: 16,
    hp: 16,
    statusImmunities: ["stun"],
    actions: ["player_special_dullauto"],
    graphic: `
        <div class="sprite-wrapper archival-golem bstrd-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/bsthead.gif" id="%SLUG-golemsprite-head">
                    <img src="/img/sprites/combat/foes/bstface.gif" id="%SLUG-golemsprite-face">
                </div>
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/bstgun.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunlower">
                <img src="/img/sprites/combat/foes/bstgunraise.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunraise">
                <img src="/img/sprites/combat/foes/bstgunblam.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms gunblam">
            </div>

            <div class="target" entity="bstrd golem"></div>
        </div>
        `,
    reactions: {}, //SILENT CREATURE
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1],["high_priority", 1]],
}

env.COMBAT_ACTORS.player_dull_translation_core = {
    name: "Warped Translation Core",
    maxhp: 27,
    hp: 27,
    actions: ["special_player_chant_weak"],
    statusImmunities: ["stun"],
    graphic: `
        <div class="sprite-wrapper wordfriend" id="%SLUG-sprite-wrapper">
            <div class="spinny">
                <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
                <img src="/img/sprites/combat/foes/translator_core.gif" class="sprite diamond">
            </div>

            <div class="orbs">
                <div class="orb"></div>
                <div class="orb"></div>
                <div class="orb"></div>
            </div>

            <div class="orbs">
                <div class="orb"></div>
                <div class="orb"></div>
            </div>

            <div class="target" entity="translation core"></div>
        </div>
        `,
    reactions: {
        catchall: ["████ ███", "██ ██████", "█████ ████", "███", "███ ███ ███", "███ █ ████", "██████ ██", "█ ████", "████ █ █ █"],
        dead: ["███ █ █ █ ███"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1],["high_priority", 1]],
}

    env.COMBAT_ACTORS.player_dull_dullzika = {
        name: "Glowing Dullzika",
        maxhp: 27,
        hp: 27,
        actions: ["special_dullsummon_weak"],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper golemsprite dullzika" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/combat/foes/turboglazika.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/turboglazika-hat.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/turboglazika-eyes.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                <img src="/img/sprites/combat/foes/turboglazika-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">

                <div class="target" entity="dullzika"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1],["high_priority", 1]],
    }

env.COMBAT_ACTORS.player_dull_kivii = {
    name: "Greater Dusk",
    maxhp: 60,
    hp: 60,
    actions: ["speak_weak", "spy_target", "enemy_shell","special_player_kiviisummon"],
    statusImmunities: ["stun"],
    graphic: `
        <div class="sprite-wrapper kivii" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img class="sprite" src="/img/sprites/combat/foes/kivii/combat.gif" id="%SLUG-sprite">
                <div class="target" entity="dozkallvi"></div>
            </div>
        </div>
        `,
    reactions: {
        evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
        crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
        receive_crit: ["hu r ts", "", "", "", "", "", ""],
        receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
        receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
        receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
        receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
        receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
        receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
        stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
        regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
        give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
    },
    initialStatusEffects: [["player_conjoined", 1],["player_ethereal", 1],["perma_vulnerable", 1],["high_priority", 1]],
}

env.COMBAT_ACTORS.player_dull_kivii_gauntlet = {
    name: "Warped Gauntlet",
    maxhp: 60,
    hp: 60,
    actions: ["windup", "kivii_grasp_weak"],
    windupActions: ["archival_smash_weak"],
    graphic: `
        <div class="sprite-wrapper kiviigauntlet" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/sprites/combat/foes/kivii/gauntlet.gif" id="%SLUG-sprite">
            <div class="target" entity="gauntlet"></div>
        </div>
        `,
    reactions: {},
    initialStatusEffects: [["player_conjoined", 1],["player_ethereal", 1],["perma_vulnerable", 1],["high_priority", 1]],
}

env.COMBAT_ACTORS.player_dull_golemboss = {
    name: "Warped Foundation Golem",
    maxhp: 60,
    hp: 60,
    actions: ["golemboss_strike","golemboss_advance","golemboss_guard","golemboss_windup"],
    windupActions: ["golemboss_strike_strong","golemboss_advance_strong","golemboss_guard_strong","golemboss_focused_strong"],
    statusImmunities: ["stun"],
    graphic: `
        <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="foundation golem"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1],["high_priority", 1]],
}

    //warped collapse actors
env.COMBAT_ACTORS.player_dull_container = {
    name: "Warped Container",
    maxhp: 2,
    hp: 2,
    actions: ["brawl_weak"],
    graphic: `
        <div class="sprite-wrapper dulltainer" id="%SLUG-sprite-wrapper">
            <img class="sprite" src="/img/sprites/combat/foes/inc_dull.gif" id="%SLUG-sprite">
            <div class="target" entity="warped container"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_destabilized"]],
}

env.COMBAT_ACTORS.player_dull_attendant = {
    name: "Warped Attendant",
    maxhp: 2,
    hp: 2,
    actions: ["brawl_weak", "foe_stab_weak"],
    graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <div class="attendant-sprite">
                <img class="sprite" src="/img/local/embassy/spiredronebody.gif" id="%SLUG-sprite">
            </div>
            <div class="target" entity="attendant"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_veilklight = {
    name: "Warped Veilklight",
    maxhp: 3,
    hp: 3,
    actions: ["spy_weak", "mend_weak", "daze_lastresort_weak"],
    graphic: `
        <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
            <div class="veilksprite">
                <img class="sprite" src="/img/sprites/combat/foes/foelampbase.gif" id="%SLUG-sprite">
            </div>
            <div class="target" entity="hostile veilklight"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_maintcloak = {
    name: "Warped Jutskin",
    maxhp: 10,
    hp: 7,
    actions: ["special_barrier_allies_weak", "stab_weak"],
    graphic: `
        <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
            <div class="spritestack" style="transform-style: preserve-3d;">
                <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                <div class="target" entity="jutskin"></div>
            </div>
        </div>
    `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_archival_golem = {
    name: "Warped Archival Golem",
    maxhp: 14,
    hp: 10,
    actions: ["windup"],
    windupActions: ["archival_smash_weak"],
    graphic: `
        <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="archival golem"></div>
        </div>
        `,
    reactions: { //SILENT CREATURE
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1]],
}

    //warped golem maintanence actors
env.COMBAT_ACTORS.player_dull_basic_golem = {
    name: "Warped Golem",
    maxhp: 5,
    hp: 5,
    actions: ["special_self_destruct_dull", "berserk", "foe_stab_weak"],
    graphic: `
        <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
            </div>

            <div class="target" entity="golem"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_husk = {
    name: "Dusk",
    readoutActor: "dusk",
    maxhp: 7,
    hp: 7,
    actions: ["player_husk_attack_weak", "speak_weak", "stab_weak", "evade_weak"],

    //graphic is controlled mainly by the sprite creation event below, check it out!
    graphic: `
        <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
            <div class="spritestack" id="%SLUG-sprite">
                <img src="" class="sprite basis">
                <div class="sprite toplayer"></div>
                <div class="sprite bottomlayer"></div>
            </div>
            <div class="target" entity="husk"></div>
        </div>
    `,
   reactions: {
		evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
		crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
		receive_crit: ["hu r ts"],
		receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
		puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
		receive_buff: ["µÿÁiKp%Ñ"],
		receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
		receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
		receive_carapace: ["MËºY¾Ñ"],
		receive_redirection: ["f ina l ly aw  ake"],
		stun: ["o u  t ou t o ut", "ou to u t o  ut"],
		regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
		give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1]],
}

env.COMBAT_ACTORS.player_dull_surgeon_golem = {
    name: "Warped Repairfriend",
    maxhp: 5,
    hp: 5,
    actions: ["mend_weak", "tozik_attack_weak", "foe_stab_weak"],
    graphic: `
        <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="repairfriend"></div>
        </div>
    `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_pressure_golem = {
    name: "Warped Kivskin",
    maxhp: 8,
    hp: 8,
    actions: ["bozko_attack_weak", "guard"],
    graphic: `
        <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
            </div>

            <div class="target" entity="kivskin"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_constructor_golem = {
    name: "Warped Constructor",
    maxhp: 5,
    hp: 5,
    actions: ["brawl_weak", "barrier", "spy_analyze_weak", "special_limited_carapace"],
    graphic: `
        <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="constructor"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["dull_malfunction", 1]],
}

env.COMBAT_ACTORS.player_dull_dullfriend = {
    name: "Glowing Dullfriend",
    maxhp: 12,
    hp: 12,
    actions: ["brawl", "ik_attack_vanity", "dullflare_vanity", "evade_weak"],
    graphic: `
        <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                </div>
                <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="foundation golem"></div>
        </div>
        `,
    reactions: {
        catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
        dead: ["¿", "???"]
    },
    initialStatusEffects: [["player_ethereal", 1],["perma_vulnerable", 1],["dull_malfunction", 1]],
}

    env.COMBAT_ACTORS.player_hands_critta_pawn = {
        name: "WRK",
        specialClass: "daemonactor",
        maxhp: 10,
		hp: 5,
        actions: ["revise", "mad_claw", "evade"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="wrk"></div>
                <figure class="daemon pawn accurate-position"> 
                    <img src="/img/sprites/daemons/pawn/base.gif">
                    <div class="eye"></div>
                    <div class="scraps noimg">
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

    env.COMBAT_ACTORS.player_hands_critta_knight = {
        name: "CLW",
        specialClass: "daemonactor",
        maxhp: 15,
		hp: 8,
        actions: ["cripple", "exploit", "surge"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="clw"></div>
                <figure class="daemon rook accurate-position">
                    <img src="/img/sprites/daemons/rook/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="leftarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                    <div class="rightarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
                
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

	env.COMBAT_ACTORS.player_hands_critta_bishop = {
        name: "NET",
        specialClass: "daemonactor",
        maxhp: 12,
		hp: 6,
        actions: ["speak", "parasite", "empower", "rez_player"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="net"></div>
                <figure class="daemon bishop accurate-position">
                    <img src="/img/sprites/daemons/bishop/base.gif">
                    <div class="eye"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

    env.COMBAT_ACTORS.player_hands_critta_rook = {
        name: "ENFC",
        specialClass: "daemonactor",
        maxhp: 20,
		hp: 10,
        actions: ["enforce", "focused_guard"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="enfc"></div>
                <figure class="daemon knight accurate-position">
                    <img src="/img/sprites/daemons/knight/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="uparm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

    env.COMBAT_ACTORS.player_hands_critta_queen = {
        name: "SEER",
        specialClass: "daemonactor",
        maxhp: 22,
		hp: 11,
        actions: ["windup"],
        windupActions: ["special_rule", "wound_lastresort"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="seer"></div>
                <figure class="daemon queen accurate-position">
                    <img src="/img/sprites/daemons/queen/core.gif">
                    <div class="eye"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

    env.COMBAT_ACTORS.player_hands_critta_king = {
        name: "ARCHN",
        specialClass: "daemonactor",
        maxhp: 25,
		hp: 12,
        actions: ["windup"],
        windupActions: ["special_judgement"],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="archn"></div>
                <figure class="daemon king accurate-position">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <div class="box center"></div>
                    <div class="box outer"></div>
                    <div class="ring"></div>
                    <div class="eye"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }

	env.COMBAT_ACTORS.player_hands_critta_dragon = {
		name: "IDL",
		specialClass: "daemonactor",
		maxhp: 30,
		hp: 15,
		actions: ["special_player_daemon_guard"],
		graphic: `
			<div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
				<div class="target" entity="seer"></div>
				<figure class="daemon queen accurate-position">
					<img src="/img/sprites/daemons/queen/core.gif">
					<div class="eye"></div>
					<div class="ring"></div>
					<div class="ring"></div>
					<div class="ring"></div>
				</figure>
			</div>
			`,
		reactions: {}, //SILENT CREATURE
		events: {
			onSpawn: () => change("daemon", "saw")
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}

	env.COMBAT_ACTORS.player_hands_critta_unicorn = {
		name: "MOD",
		specialClass: "daemonactor",
		maxhp: 15,
		hp: 8,
		actions: ["special_daemon_fullauto","daemon_floor_it","daemon_windup"],
		windupActions: ["special_daemon_fullerauto"],
		graphic: `
			<div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
				<div class="target" entity="clw"></div>
				<figure class="daemon rook accurate-position">
					<img src="/img/sprites/daemons/rook/body.gif">
					<div class="eye"></div>
					<div class="eye"></div>
					<div class="eye"></div>
					<div class="eye"></div>
					<div class="eye"></div>
					<div class="leftarm">
						<div class="downarm">
							<div class="upclaw"></div>
							<div class="downclaw"></div>
						</div>
					</div>
					<div class="rightarm">
						<div class="downarm">
							<div class="upclaw"></div>
							<div class="downclaw"></div>
						</div>
					</div>
				</figure>
				
			</div>
			`,
		reactions: {}, //SILENT CREATURE
		events: {
			onSpawn: () => change("daemon", "saw")
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}

	env.COMBAT_ACTORS.player_hands_critta_princess_defensive = {
		name: "GPU",
		specialClass: "daemonactor",
		maxhp: 12,
		hp: 6,
		actions: ["daemon_tesselate", "daemon_plot", "special_daemon_enact_gpu"],
		graphic: `
			<div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
				<div class="target" entity="net"></div>
				<figure class="daemon bishop accurate-position">
					<img src="/img/sprites/daemons/bishop/base.gif">
					<div class="eye"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
				</figure>
			</div>
			`,
		reactions: {}, //SILENT CREATURE
		events: {
			onSpawn: () => change("daemon", "saw")
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}

	env.COMBAT_ACTORS.player_hands_critta_princess_hybrid = {
		name: "MTHRBRD",
		specialClass: "daemonactor",
		maxhp: 22,
		hp: 11,
		actions: ["special_greater_cull", "special_greater_tesselate", "surge"],
		graphic: `
			<div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
				<div class="target" entity="net"></div>
				<figure class="daemon bishop accurate-position">
					<img src="/img/sprites/daemons/bishop/base.gif">
					<div class="eye"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
					<div class="tendril"></div>
				</figure>
			</div>
			`,
		reactions: {}, //SILENT CREATURE
		events: {
			onSpawn: () => change("daemon", "saw")
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}

	env.COMBAT_ACTORS.player_hands_critta_superknight = {
		name: "DEL",
		specialClass: "daemonactor",
		maxhp: 22,
		hp: 11,
		actions: ["windup"],
		windupActions: ["daemon_smash"],
		graphic: `
			<div class="sprite-wrapper daemon_del superknightsprite" id="%SLUG-sprite-wrapper">
				<div class="sprite-overflow spritestack">
					<img src="https://file.garden/ZuXhuiZ9jXAsicUq/bstrdsing_wholesprite-DEL-gifver.gif" style="max-height: 405px; max-width: 945px;" id="%SLUG-superknightsprite-whole" class="sprite superknightsprite-whole">

				<div class="target" entity="archival golem"></div>
			</div>
			`,
		reactions: { //SILENT CREATURE
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_metal_archival_golem = {
        name: "Archival Golem",
        maxhp: 20,
        hp: 8,
        actions: ["windup"],
        windupActions: ["archival_smash"],
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
    }

	env.COMBAT_ACTORS.player_metal_maintcloak = {
        name: "Jutskin",
        maxhp: 15,
        hp: 5,
        actions: ["special_barrier_allies_player", "stab"],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack" style="transform-style: preserve-3d;">
                    <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
        turnCheck: "maintcloak"
    }
	
	env.COMBAT_ACTORS.player_metal_constructor_golem = {
        name: "Constructor",
        maxhp: 8,
        hp: 4,
        actions: ["attack", "barrier", "spy_analyze", "special_limited_carapace"],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.player_metal_pressure_golem = {
        name: "Kivskin",
        maxhp: 12,
        hp: 6,
        actions: ["bozko_attack", "guard"],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.player_metal_dull_golem = {
        name: "Dullfriend",
        maxhp: 18,
        hp: 10,
        actions: ["brawl", "windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup"],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }

	env.COMBAT_ACTORS.player_metal_surgeon_golem = {
        name: "Repairfriend",
        maxhp: 8,
        hp: 4,
        actions: ["mend", "tozik_attack", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }

    env.COMBAT_ACTORS.player_metal_basic_golem = {
        name: "Golem",
        maxhp: 8,
        hp: 4,
        actions: ["special_self_destruct", "berserk", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.metal_archival_golem = {
        name: "Archival Golem",
        maxhp: 20,
        hp: 8,
        actions: ["windup"],
        windupActions: ["archival_smash"],
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["ethereal", 1]],
    }

	env.COMBAT_ACTORS.metal_maintcloak = {
        name: "Jutskin",
        maxhp: 15,
        hp: 5,
        actions: ["special_barrier_allies", "stab"],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack" style="transform-style: preserve-3d;">
                    <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
        turnCheck: "maintcloak"
    }
	
	env.COMBAT_ACTORS.metal_constructor_golem = {
        name: "Constructor",
        maxhp: 8,
        hp: 4,
        actions: ["attack", "barrier", "spy_analyze", "special_limited_carapace"],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.metal_pressure_golem = {
        name: "Kivskin",
        maxhp: 12,
        hp: 6,
        actions: ["bozko_attack", "guard"],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.metal_dull_golem = {
        name: "Dullfriend",
        maxhp: 18,
        hp: 10,
        actions: ["brawl", "windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup"],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
    }

	env.COMBAT_ACTORS.metal_surgeon_golem = {
        name: "Repairfriend",
        maxhp: 8,
        hp: 4,
        actions: ["mend", "tozik_attack", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
    }

    env.COMBAT_ACTORS.metal_basic_golem = {
        name: "Golem",
        maxhp: 8,
        hp: 4,
        actions: ["special_self_destruct", "berserk", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["ethereal", 1]],
    }

	env.COMBAT_ACTORS.player_metal_basic_golem_mega = {
        name: "Greater Golem",
        maxhp: 15,
        hp: 8,
        actions: ["windup"],
		windupActions: ["special_self_destruct_mega", "berserk_mega_golem", "foe_stab_metal"],
        graphic: `
            <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }

	env.COMBAT_ACTORS.player_metal_constructor_golem_mega = {
        name: "Greater Constructor",
        maxhp: 15,
        hp: 8,
        actions: ["windup"],
		windupActions: ["attack_smash", "barrier_mega", "ultra_spy_analyze", "special_limited_carapace_bonus"],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
    env.COMBAT_ACTORS.player_metal_maintcloak_mega = {
        name: "Greater Jutskin",
        maxhp: 30,
        hp: 10,
        actions: ["windup"],
		windupActions: ["special_restorative_barrier_metal", "stab_metal"],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack" style="transform-style: preserve-3d;">
                    <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
        turnCheck: "maintcloak"
    }

    env.COMBAT_ACTORS.player_metal_pressure_golem_mega = {
        name: "Greater Kivskin",
        maxhp: 25,
        hp: 12,
        actions: ["windup"],
		windupActions: ["cripple_metal", "special_guard_all_metal"],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }

    env.COMBAT_ACTORS.player_metal_surgeon_golem_mega = {
        name: "Greater Repairfriend",
        maxhp: 15,
        hp: 8,
        actions: ["windup"],
		windupActions: ["mend_metal", "tozik_attack_metal", "foe_stab_metal", "windup_winderup", "restore_metal"],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
	env.COMBAT_ACTORS.player_metal_archival_golem_mega = {
        name: "Greater Archival Golem",
        maxhp: 40,
        hp: 15,
        actions: ["windup"],
        windupActions: ["archival_smash", "windup_winderup", "archival_smash_mega"],
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
		initialStatusEffects: [["player_ethereal", 1]],
    }
	
    env.COMBAT_ACTORS.player_metal_dull_golem_mega = {
        name: "Greater Dullfriend",
        maxhp: 70,
        hp: 35,
        actions: ["brawl_metal", "windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup", "windup_winderup", "cavernhammer", "quick_forge", "windup_windestup", "veilkruka", "incinerate", "windup_final_windup", "cavernsplitter", "immolate"],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1]],
    }
	//pain husks start here
	//note to self:: the plan is to make husks corresponding to each humor, with most of an individual humor's abilities being inverted (husk distract gives foes vulnerable on crit, husk corruskivi gives foes puncture on crit, etc.)
	//also make one that's just kazki for the funny
	env.COMBAT_ACTORS.player_pain_husk = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 10,
		hp: 5,
		actions: ["husk_attack", "speak", "stab", "evade"],

		//graphic is controlled mainly by the sprite creation event below, check it out! <--- not ANYMORE!!!!! >:)
		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_ichor = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 10,
		hp: 5,
		actions: ["husk_attack_ichor", "speak_ichor", "mend", "sacrifice", "sacrifice_restore"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_eyes = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 12,
		hp: 6,
		actions: ["husk_attack_eyes", "spy_target", "plot", "special_enact_pain"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_claws = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 12,
		hp: 6,
		actions: ["husk_attack_claws", "bite_weak", "frenzy", "surge"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_bone = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 20,
		hp: 10,
		actions: ["husk_attack_bone", "speak_bone", "guard", "shell"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_light = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 16,
		hp: 8,
		actions: ["husk_attack_light", "speak_light", "destabilize", "special_invite_storm"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 10,
		hp: 5,
		actions: ["husk_attack", "speak", "stab", "evade"],

		//graphic is controlled mainly by the sprite creation event below, check it out! <--- not ANYMORE!!!!! >:)
		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk_ichor = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 10,
		hp: 5,
		actions: ["husk_attack_ichor", "speak_ichor", "mend", "sacrifice", "sacrifice_restore"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk_eyes = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 12,
		hp: 6,
		actions: ["husk_attack_eyes", "spy_target", "plot", "special_enact_pain"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk_claws = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 12,
		hp: 6,
		actions: ["husk_attack_claws", "bite_weak", "frenzy", "surge"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk_bone = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 20,
		hp: 10,
		actions: ["husk_attack_bone", "speak_bone", "guard", "shell"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.pain_husk_light = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 16,
		hp: 8,
		actions: ["husk_attack_light", "speak_light", "destabilize", "special_invite_storm"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        },
		initialStatusEffects: [["ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_flesh = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 18,
		hp: 9,
		actions: ["husk_attack_rot", "bite_weak", "special_demoralize", "evade"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_dull = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 16,
		hp: 8,
		actions: ["husk_attack_dull", "speak_dull", "special_player_dullsummon", "special_player_dullbuff"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_spirestone = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 20,
		hp: 10,
		actions: ["windup", "special_barrier_allies_player", "evade_empowered"],
		windupActions: ["husk_smash", "stab_metal"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_hands = {
		name: "Husk",
		readoutActor: "husk",
		maxhp: 14,
		hp: 7,
		actions: ["husk_attack_hands", "prayer", "falseprayer", "special_prophesize"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_akizet = {
		name: "Akizet?",
		readoutActor: "husk",
		maxhp: 18,
		hp: 9,
		actions: ["eviscerate_better", "frenzy", "speak_light", "wild_surge"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_gakvu = {
		name: "Gakvu?",
		readoutActor: "husk",
		maxhp: 15,
		hp: 8,
		actions: ["countercall", "special_mass_destabilize", "speak_dull", "special_invoke_madness"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_tozik = {
		name: "Tozik?",
		readoutActor: "husk",
		maxhp: 15,
		hp: 8,
		actions: ["parasite", "optimize", "special_final_sacrifice", "sacrifice_restore"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_miltza = {
		name: "Miltza?",
		readoutActor: "husk",
		maxhp: 15,
		hp: 8,
		actions: ["miltza_attack", "spy_target", "plot", "special_enact_pain"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1], ["attack_drone", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_bozko = {
		name: "Bozko?",
		readoutActor: "husk",
		maxhp: 22,
		hp: 11,
		actions: ["cripple", "special_guard_all", "speak_bone", "special_carapace_allies"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_cavik = {
		name: "Cavik?",
		readoutActor: "husk",
		maxhp: 15,
		hp: 8,
		actions: ["bazruka", "special_restorative_barrier", "bite_weak", "surge"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1], ["focused", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_ikgolem = {
		name: "IK Golem?",
		readoutActor: "husk",
		maxhp: 20,
		hp: 10,
		actions: ["windup", "husk_attack", "speak"],
		windupActions: ["ik_attack", "dullflare", "focused_windup"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	env.COMBAT_ACTORS.player_pain_husk_kazki = {
		name: "Kazki?",
		readoutActor: "husk",
		maxhp: 15,
		hp: 8,
		actions: ["special_fullauto_player", "sidearm", "daemon_floor_it", "coordination"],

		graphic: `
			<div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
				<div class="spritestack" id="%SLUG-sprite">
					<img src="" class="sprite basis">
					<div class="sprite toplayer"></div>
					<div class="sprite bottomlayer"></div>
				</div>
				<div class="target" entity="husk"></div>
			</div>
		`,
	   reactions: {
			evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er"],
			crit: ["Ü di¢ö1€Oe Î", "R E TU RN"],
			receive_crit: ["hu r ts"],
			receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ"],
			receive_buff: ["µÿÁiKp%Ñ"],
			receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct"],
			receive_vulnerable: ["ƒøÊ=è¶", "s e e"],
			receive_carapace: ["MËºY¾Ñ"],
			receive_redirection: ["f ina l ly aw  ake"],
			stun: ["o u  t ou t o ut", "ou to u t o  ut"],
			regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e"],
			give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ"],
		},
		initialStatusEffects: [["player_ethereal", 1]],
	}
	
	//oh god here we go again
	//husked combat actors start here
	env.COMBAT_ACTORS.container_husked = {
        name: "Container",
        maxhp: 6,
        hp: 6,
        actions: ["attack", "attack", "attack", "skitter"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/inc.gif" id="%SLUG-sprite">
                <div class="target" entity="hostile container"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        turnCheck: "container"
    }
	
	env.COMBAT_ACTORS.attendant_husked = {
        name: "Spire Attendant",
        maxhp: 8,
        hp: 8,
        actions: ["attack", "foe_stab"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="attendant-sprite">
                    <img class="sprite" src="/img/local/embassy/spiredronebody.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="attendant"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]]
    }
	
	env.COMBAT_ACTORS.tendrils_proxy_husked = {
        name: "Tendril",
        turnCheck: "tendrils",
        maxhp: 10,
        hp: 10,
        actions: ["swipe"],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/tendrils.gif" id="%SLUG-sprite">
                <div class="target" entity="tendrils"></div>
            </div>
            `,
        reactions: {},
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]]
    }
	
	env.COMBAT_ACTORS.veilklight_husked = {
        name: "Veilklight",
        maxhp: 10,
        hp: 10,
        actions: ["spy", "mend", "daze_lastresort"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="veilksprite">
                    <img class="sprite" src="/img/sprites/combat/foes/foelampbase.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="hostile veilklight"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.archival_golem_husked = {
        name: "Archival Golem",
        maxhp: 40,
        hp: 30,
        actions: ["windup"],
        windupActions: ["archival_smash"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper archival-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/archivalgolem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/archivalgolem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/archivalgolem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/archivalgolem-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="archival golem"></div>
            </div>
            `,
        reactions: {} //SILENT CREATURE
    }
	
	env.COMBAT_ACTORS.bstrdlight_proxy_husked = {
        name: "BSTRDlight",
        maxhp: 40,
        hp: 30,
        actions: ["spy", "mend", "special_mass_destabilize", "swipe", "rez_player"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper" id="%SLUG-sprite-wrapper">
                <div class="veilksprite bstrdlight">
                    <img class="sprite" src="/img/sprites/combat/foes/bstrdlampbase.gif" id="%SLUG-sprite">
                </div>
                <div class="target" entity="bstrdlight"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        turnCheck: "lastRezzer"
    }
	
	env.COMBAT_ACTORS.maintcloak_husked = {
        name: "Jutskin",
        maxhp: 30,
        hp: 20,
        actions: ["special_barrier_allies_player", "stab"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper maintcloak" id="%SLUG-sprite-wrapper">
                <div class="spritestack" style="transform-style: preserve-3d;">
                    <img class="sprite" src="/img/sprites/combat/foes/maintcloak.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">
                    <img class="sprite" src="/img/sprites/combat/foes/mainthead.gif">

                    <div class="target" entity="jutskin"></div>
                </div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        turnCheck: "maintcloak"
    }
	
	env.COMBAT_ACTORS.husk_husked = {
        name: "Husk",
        readoutActor: "husk",
        maxhp: 20,
        hp: 20,
        actions: ["husk_attack", "speak", "stab", "evade"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],

        //graphic is controlled mainly by the sprite creation event below, check it out!
        graphic: `
            <div class="sprite-wrapper husk" id="%SLUG-sprite-wrapper" type="">
                <div class="spritestack" id="%SLUG-sprite">
                    <img src="" class="sprite basis">
                    <div class="sprite toplayer"></div>
                    <div class="sprite bottomlayer"></div>
                </div>
                <div class="target" entity="husk"></div>
            </div>
        `,

        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        },

        regenAllSprites: (ungeneratedOnly = false) => { //used in combat and stage stuff
            let query = '.husk.sprite-wrapper'
            if(ungeneratedOnly) query = '.husk.sprite-wrapper:not(.generated)'
            document.querySelectorAll('.husk.sprite-wrapper').forEach(sprite=>{
                env.COMBAT_ACTORS.husk.events.onSpriteCreation(sprite)
            })
        },
        
        events: {
            onSpriteCreation: (sprite) => {
                if(content.querySelector("critta-map")) { return }

                let types = [
                    {
                        name: "type1",
                        bottomCount: 2,
                        topCount: 3
                    },
                    {
                        name: "type2",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type3",
                        bottomCount: 2,
                        topCount: 2
                    },
                    {
                        name: "type4",
                        bottomCount: 2,
                        topCount: 3
                    },
                ]

                let type = types.sample()
                type.decidedT = rand(1, type.topCount + 1)
                type.decidedB = rand(1, type.bottomCount + 1)
                sprite.setAttribute("type", type.name.replace('type', ''))
                sprite.setAttribute("b", type.decidedB)
                sprite.setAttribute("t", type.decidedT)
                sprite.querySelector("img.basis").src = `/img/sprites/combat/foes/husks/${type.name}_bottom${type.decidedB}.gif`
                sprite.classList.add('generated')
            }
        }
    }
	
	env.COMBAT_ACTORS.constructor_golem_husked = {
        name: "Constructor",
        maxhp: 15,
        hp: 15,
        actions: ["attack", "barrier", "spy_analyze", "special_limited_carapace"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper constructor-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/constructor.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/constructor-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/constructor-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/constructor-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/constructor-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="constructor"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.pressure_golem_husked = {
        name: "Kivskin",
        maxhp: 25,
        hp: 25,
        actions: ["bozko_attack", "guard"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper pressure-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/pressure.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/pressure-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/pressure-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/pressure-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/pressure-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="kivskin"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.dull_golem_husked = {
        name: "Dullfriend",
        maxhp: 35,
        hp: 35,
        actions: ["brawl", "windup"],
        windupActions: ["ik_attack", "dullflare", "focused_windup"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper golemsprite bossgolem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golemboss.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golemboss-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golemboss-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golemboss-arms.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="foundation golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.surgeon_golem_husked = {
        name: "Repairfriend",
        maxhp: 15,
        hp: 15,
        actions: ["mend", "tozik_attack", "foe_stab"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper surgeon-golem golemsprite" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/surgeon.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/surgeon-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/surgeon-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/surgeon-arms.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
                </div>

                <div class="target" entity="repairfriend"></div>
            </div>
        `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.basic_golem_husked = {
        name: "Golem",
        maxhp: 15,
        hp: 15,
        actions: ["special_self_destruct", "berserk", "foe_stab"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper golemsprite basic-golem" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img src="/img/sprites/combat/foes/golem.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                    
                    <div class="sprite golemsprite-head">
                        <img src="/img/sprites/combat/foes/golem-head.gif" id="%SLUG-golemsprite-head">
                    </div>
                    <img src="/img/sprites/combat/foes/golem-neck.gif" id="%SLUG-golemsprite-neck" class="sprite golemsprite-neck">
                    <img src="/img/sprites/combat/foes/golem-body.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                    <img src="/img/sprites/combat/foes/golem-leftarm.gif" id="%SLUG-golemsprite-leftarm" class="sprite golemsprite-leftarm">
                    <img src="/img/sprites/combat/foes/golem-rightarm.gif" id="%SLUG-golemsprite-rightarm" class="sprite golemsprite-rightarm">
                </div>

                <div class="target" entity="golem"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.kivii_gauntlet_husked = {
        name: "Gauntlet",
        maxhp: 175,
        hp: 175,
        actions: ["windup", "kivii_grasp"],
        windupActions: ["archival_smash"],
        graphic: `
            <div class="sprite-wrapper kiviigauntlet" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/kivii/gauntlet.gif" id="%SLUG-sprite">
                <div class="target" entity="gauntlet"></div>
            </div>
            `,
        reactions: {},
        initialStatusEffects: [["player_ethereal", 1], ["conjoined", 1]]
    }
	
	env.COMBAT_ACTORS.dull_container_husked = {
        name: "Warped Container",
        maxhp: 2,
        hp: 2,
        actions: ["brawl_weak"],
        graphic: `
            <div class="sprite-wrapper dulltainer" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/inc_dull.gif" id="%SLUG-sprite">
                <div class="target" entity="warped container"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        },
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]]
    }
	
	env.COMBAT_ACTORS.hallucination_proxy_husked = {
        name: "»õGQàº3¾õ”cR%",
        maxhp: 3,
        hp: 3,
        actions: ["speak", "husk_attack_weak"],
        graphic: `
            <div class="sprite-wrapper hallucination" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite basis" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                    <img class="sprite base" src="/img/sprites/combat/foes/hallucinations/akizet.png" id="%SLUG-sprite">
                    <img class="sprite eyes" src="/img/sprites/combat/foes/hallucinations/akizet_eyes.png" id="%SLUG-sprite">
                </div>
                <div class="target" entity="»õGQàº3¾õ”cR%"></div>
            </div>
            `,
        reactions: {},
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        turnCheck: "hallucinations",
        events: {
            onSpriteCreation: (sprite) => {
                if(!sprite) return
        
                let basis = sprite.querySelector('img.basis')
                let base = sprite.querySelector('img.base')
                let eyes = sprite.querySelector('img.eyes')
                let hallucinatorbase = false
                fetch(`https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/${env.hallucinator}.gif`).then(resp=>{if(resp.status != 404){hallucinatorbase = true}})

                if(env.hallucinator.slice(0, 7) == "generic") {
                    basis.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic.gif`
                    base.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic.gif`
                    eyes.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic_eyes.gif`
                } else if (hallucinatorbase == true){
                    basis.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/${env.hallucinator}.gif`
                    base.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/${env.hallucinator}.gif`
                    eyes.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/${env.hallucinator}_eyes.gif`                    
                } else {
                    basis.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic.gif`
                    base.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic.gif`
                    eyes.src = `https://adrfurret.neocities.org/corrumods/img/sprites/combat/foes/hallucinations/generic_eyes.gif`
                }
            }
        }
    }
	
	env.COMBAT_ACTORS.critta_pawn_husked = {
        name: "WRK",
        specialClass: "daemonactor",
        maxhp: 20,
        actions: ["revise", "mad_claw", "evade"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="wrk"></div>
                <figure class="daemon pawn accurate-position"> 
                    <img src="/img/sprites/daemons/pawn/base.gif">
                    <div class="eye"></div>
                    <div class="scraps noimg">
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                        <div class="scrap"></div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        }
    }
	
	env.COMBAT_ACTORS.critta_knight_husked = {
        name: "CLW",
        specialClass: "daemonactor",
        maxhp: 30,
        actions: ["cripple", "exploit", "surge"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="clw"></div>
                <figure class="daemon rook accurate-position">
                    <img src="/img/sprites/daemons/rook/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="leftarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                    <div class="rightarm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
                
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }
	
	env.COMBAT_ACTORS.critta_bishop_husked = {
        name: "NET",
        specialClass: "daemonactor",
        maxhp: 25,
        actions: ["speak", "parasite", "empower", "rez_player"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="net"></div>
                <figure class="daemon bishop accurate-position">
                    <img src="/img/sprites/daemons/bishop/base.gif">
                    <div class="eye"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                    <div class="tendril"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }
	
	env.COMBAT_ACTORS.critta_rook_husked = {
        name: "ENFC",
        specialClass: "daemonactor",
        maxhp: 40,
        actions: ["enforce", "focused_guard"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="enfc"></div>
                <figure class="daemon knight accurate-position">
                    <img src="/img/sprites/daemons/knight/body.gif">
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="eye"></div>
                    <div class="uparm">
                        <div class="downarm">
                            <div class="upclaw"></div>
                            <div class="downclaw"></div>
                        </div>
                    </div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }
	
	env.COMBAT_ACTORS.critta_queen_husked = {
        name: "SEER",
        specialClass: "daemonactor",
        maxhp: 45,
        actions: ["windup"],
        windupActions: ["special_rule", "wound_lastresort"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="seer"></div>
                <figure class="daemon queen accurate-position">
                    <img src="/img/sprites/daemons/queen/core.gif">
                    <div class="eye"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }
	
	env.COMBAT_ACTORS.critta_king_husked = {
        name: "ARCHN",
        specialClass: "daemonactor",
        maxhp: 50,
        actions: ["windup"],
        windupActions: ["special_judgement"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="archn"></div>
                <figure class="daemon king accurate-position">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <img src="/img/sprites/daemons/king/angles.gif">
                    <div class="box center"></div>
                    <div class="box outer"></div>
                    <div class="ring"></div>
                    <div class="eye"></div>
                </figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
        events: {
            onSpawn: () => change("daemon", "saw")
        },
    }
	
	env.COMBAT_ACTORS.critta_spawner_bee_husked = {
        name: "IDEA",
        specialClass: "daemonactor",
        maxhp: 10,
        actions: ["husk_attack_rot", "surge"],
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        turnCheck: "genericEthereal",
        graphic: `
            <div class="sprite-wrapper daemonsprite" id="%SLUG-sprite-wrapper">
                <div class="target" entity="idea"></div>
                <figure class="daemon bee"><div class="sides"><span></span><span></span><span></span><span></span><span></span><span></span></div></figure>
            </div>
            `,
        reactions: {}, //SILENT CREATURE
    }
	
	env.COMBAT_ACTORS.akizet_boss_husked = {
        name: "Leaderfriend",
        maxhp: 25,
        hp: 25,
        actions: [
            "akizet_attack",
            "stab", 
            "evade"
        ],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper akizet" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/akizet/dith.gif">
                    <div class="target" entity="akizetesche"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        }
    }
	
	env.COMBAT_ACTORS.gakvu_boss_husked = {
        name: "Groundsfriend",
        maxhp: 20,
        hp: 20,
        actions: ["gakvu_attack", "destabilize", "evade"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper gakvu" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/gakvu/full/gakvu_legs.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/gakvu/full/gakvu_poncho.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/gakvu/full/gakvu_head.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/gakvu/full/gakvu_face.gif">
                    <div class="target" entity="gakvu"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        },
    }
	
	env.COMBAT_ACTORS.tozik_boss_husked = {
        name: "Mendfriend",
        maxhp: 20,
        hp: 20,
        actions: ["tozik_attack", "mend", "evade"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper tozik" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/tozik/full/tozik_body.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/tozik/full/tozik_arms.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/tozik/full/tozik_headcore.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/tozik/full/tozik_head.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/tozik/full/tozik_eyes.gif">
                    <div class="target" entity="tozik"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        }
    }
	
	env.COMBAT_ACTORS.miltza_boss_husked = {
        name: "Planfriend",
        maxhp: 20,
        hp: 20,
        actions: ["miltza_attack", "spy", "evade"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper miltza" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/legs.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/torso.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/arms.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/okizika_arm.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/head.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/miltza/full/face.gif">
                    <div class="target" entity="miltza"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        }
    }
	
	env.COMBAT_ACTORS.cavik_boss_husked = {
        name: "Kavrukafriend",
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1], ["fear", 1]],
        maxhp: 20,
        hp: 20,
        actions: ["cavik_attack", "special_barrier_allies", "evade"],
        graphic: `
            <div class="sprite-wrapper cavik" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikabdomen.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikboots.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikhands.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikponcho.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikhair.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/cavik/full/cavikmask.gif">
                    <div class="target" entity="cavik"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        }
    }
	
	env.COMBAT_ACTORS.bozko_boss_husked = {
        name: "Guardfriend",
        maxhp: 35,
        hp: 35,
        actions: ["bozko_attack", "guard", "shell"],
		initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1]],
        graphic: `
            <div class="sprite-wrapper bozko" id="%SLUG-sprite-wrapper">
                <div class="sprite-overflow spritestack">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/bozko/full/bozkofingers.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/bozko/full/bozkoarms.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/bozko/full/bozkobody.gif">
                    <img class="sprite" src="https://adrfurret.neocities.org/corrumods/img/sprites/obesk/bozko/full/bozkohead.gif">
                    <div class="target" entity="bozko"></div>
                </div>
            </div>
        `,
        reactions: {
            evade: ["s tŒ¥ó y  aw œ y", "n o  c l os er", "", "", "", "", "", ""],
            crit: ["Ü di¢ö1€Oe Î", "R E TU RN", "", "", "", "", "", ""],
            receive_crit: ["hu r ts", "", "", "", "", "", ""],
            receive_puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            puncture: ["h¿(‰n g er", "e}vªer ytíh&i ng", "%ÿoÛÙ", "", "", "", "", "", ""],
            receive_buff: ["µÿÁiKp%Ñ", "", "", "", "", "", ""],
            receive_destabilized: ["âª¥lé§ÎéýÁ", "dÆis co ne ct", "", "", "", "", "", ""],
            receive_vulnerable: ["ƒøÊ=è¶", "s e e", "", "", "", "", "", ""],
            receive_carapace: ["MËºY¾Ñ", "", "", "", "", "", ""],
            receive_redirection: ["f ina l ly aw  ake", "", "", "", "", "", ""],
            stun: ["o u  t ou t o ut", "ou to u t o  ut", "", "", "", "", "", ""],
            regen: ["m y f  le sh", "cl o½ se ®±… r", "m¿ ó+r  e", "", "", "", "", "", ""],
            give_fear: ["cÅ4Ä–sT ý æôr,§½ÿlfÃ ÄS¿De", "ÐⱤ0 Ø Ⱳƞ ", "§±ÂⱤ ṾḮɲG─", "YºŮ ɃěC ‰ Ṃể", "šøừ Ɍ€cɇ hȩḸ─lƥ mĒ ṨØ°ṹȑĉœ", "ḧỂḺᵽ ḿḝ ḫeȽƤ ṃệ ĦɆȽⱣ ṂỆ", "ⱤEMŒM BEɌ", "", "", "", "", "", ""],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_husked = {
        name: "???",
        maxhp: 300,
        specialClass: "intrusiveactor",
        actions: ["guard"],
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1],["weak_point", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_husked = {
        name: "???",
        maxhp: 400,
        hp: 300,
        specialClass: "intrusiveactor",
        actions: ["windup"],
        windupActions: ["trusive_smash"],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_husked = {
        name: "???",
        maxhp: 200,
        specialClass: "intrusiveactor",
        actions: ["frenzy", "special_restorative_barrier", "coordination"],
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1], ["impatient", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_husked = {
        name: "???",
        maxhp: 400,
        specialClass: "intrusiveactor",
        actions: ["revise", "special_mass_destabilize"],
        initialStatusEffects: [["player_ethereal", 1], ["puppet_conjoined", 1], ["impatient", 1], ["active_support", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.pain_secri_enemy = {
        name: "Secri",
        maxhp: 20,
        hp: 10,
        actions: ["secri_crush", "special_fullauto_secri", "special_secri_infest"],
		initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper bstrdshelf" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/archivalfoea.gif" style="height: 60vh; width: 60vw;">
                <div class="target" entity="pain shelf"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.pain_secri_ally = {
        name: "Secri",
        maxhp: 20,
        hp: 10,
        actions: ["secri_crush", "special_fullauto_secri", "special_secri_infest"],
		initialStatusEffects: [["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper bstrdshelf" id="%SLUG-sprite-wrapper">
                <img class="sprite" src="/img/sprites/combat/foes/archivalfoea.gif" style="height: 60vh; width: 60vw;">
                <div class="target" entity="pain shelf"></div>
            </div>
            `,
        reactions: {
            catchall: ["1Uië2W‡", "‡eÎKßJää", "/…¿?÷ ôLãØ", "C©Ë", "0E™Nó¨ýQÒ", "€LWé{ðÍ", "ÇæýÙ‡ß†C", "£~Uþfâ", "…Tú**"],
            dead: ["¿", "???"]
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_weak = {
        name: "???",
        maxhp: 30,
        specialClass: "intrusiveactor",
        actions: ["guard"],
        initialStatusEffects: [["weak_point", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_micro = {
        name: "???",
        maxhp: 15,
        specialClass: "intrusiveactor",
        actions: ["guard"],
        initialStatusEffects: [["weak_point", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_mega = {
        name: "???",
        maxhp: 60,
        specialClass: "intrusiveactor",
        actions: ["special_guard_all"],
        initialStatusEffects: [["weak_point", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_weak = {
        name: "???",
        maxhp: 40,
        hp: 30,
        specialClass: "intrusiveactor",
        actions: ["windup"],
        windupActions: ["intrusive_smash"],
		initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_micro = {
        name: "???",
        maxhp: 20,
        hp: 15,
        specialClass: "intrusiveactor",
        actions: ["intrusive_smash_weak"],
		initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_mega = {
        name: "???",
        maxhp: 80,
        hp: 60,
        specialClass: "intrusiveactor",
        actions: ["windup_surge"],
        windupActions: ["trusive_smash"],
		initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_weak = {
        name: "???",
        maxhp: 20,
        specialClass: "intrusiveactor",
        actions: ["frenzy", "special_restorative_barrier", "coordination"],
        initialStatusEffects: [["impatient", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_micro = {
        name: "???",
        maxhp: 10,
        specialClass: "intrusiveactor",
        actions: ["stab", "special_restorative_barrier_weak", "evade"],
        initialStatusEffects: [["impatient", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_mega = {
        name: "???",
        maxhp: 40,
        specialClass: "intrusiveactor",
        actions: ["bazruka", "special_restorative_barrier", "special_hardening_barrier", "special_chitinous_barrier", "special_surge_allies_mega"],
        initialStatusEffects: [["impatient", 1], ["dull_multitool", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_weak = {
        name: "???",
        maxhp: 40,
        specialClass: "intrusiveactor",
        actions: ["revise", "special_mass_destabilize"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_micro = {
        name: "???",
        maxhp: 20,
        specialClass: "intrusiveactor",
        actions: ["mad_claw", "special_irradiate"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_mega = {
        name: "???",
        maxhp: 80,
        specialClass: "intrusiveactor",
        actions: ["revise", "special_mass_destabilize", "special_invoke_madness"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["visionary", 1], ["retaliation", 1], ["dull_pragmatist", 1], ["flesh_menace", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
    env.COMBAT_ACTORS.intrusive_bomblet_weak = {
        name: "???",
        maxhp: 10,
        specialClass: "intrusiveactor",
        actions: ["nothing"],
        initialStatusEffects: [["ominous_timer", 1], ["ethereal", 1]],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <div class="timer"></div>
                <img src="/img/sprites/flantrusive/6.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
    env.COMBAT_ACTORS.intrusive_bomblet_micro = {
        name: "???",
        maxhp: 5,
        specialClass: "intrusiveactor",
        actions: ["nothing"],
        initialStatusEffects: [["ominous_timer_short", 1], ["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <div class="timer"></div>
                <img src="/img/sprites/flantrusive/6.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
    env.COMBAT_ACTORS.intrusive_bomblet_mega = {
        name: "???",
        maxhp: 20,
        specialClass: "intrusiveactor",
        actions: ["nothing"],
        initialStatusEffects: [["ominous_timer_long", 1], ["ethereal", 1]],
        statusImmunities: ["stun"],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <div class="timer"></div>
                <img src="/img/sprites/flantrusive/6.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_weak_ally = {
        name: "???",
        maxhp: 30,
        specialClass: "intrusiveactor",
        actions: ["guard"],
        initialStatusEffects: [["weak_point", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_micro_ally = {
        name: "???",
        maxhp: 15,
        specialClass: "intrusiveactor",
        actions: ["guard"],
        initialStatusEffects: [["weak_point", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_blocker_mega_ally = {
        name: "???",
        maxhp: 60,
        specialClass: "intrusiveactor",
        actions: ["special_guard_all"],
        initialStatusEffects: [["weak_point", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/2.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_weak_ally = {
        name: "???",
        maxhp: 40,
        hp: 30,
        specialClass: "intrusiveactor",
        actions: ["windup"],
        windupActions: ["trusive_smash"],
		initialStatusEffects: [["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_micro_ally = {
        name: "???",
        maxhp: 20,
        hp: 15,
        specialClass: "intrusiveactor",
        actions: ["trusive_smash_weak"],
		initialStatusEffects: [["ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_archival_mega_ally = {
        name: "???",
        maxhp: 80,
        hp: 60,
        specialClass: "intrusiveactor",
        actions: ["windup_surge"],
        windupActions: ["trusive_smash"],
		initialStatusEffects: [["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/3.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_weak_ally = {
        name: "???",
        maxhp: 20,
        specialClass: "intrusiveactor",
        actions: ["frenzy", "special_restorative_barrier", "coordination"],
        initialStatusEffects: [["impatient", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_micro_ally = {
        name: "???",
        maxhp: 10,
        specialClass: "intrusiveactor",
        actions: ["stab", "special_restorative_barrier_weak", "evade"],
        initialStatusEffects: [["impatient", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_bishopfreak_mega_ally = {
        name: "???",
        maxhp: 40,
        specialClass: "intrusiveactor",
        actions: ["bazruka", "special_restorative_barrier", "special_hardening_barrier", "special_chitinous_barrier", "special_surge_allies_mega"],
        initialStatusEffects: [["impatient", 1], ["dull_multitool", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/4.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_weak_ally = {
        name: "???",
        maxhp: 40,
        specialClass: "intrusiveactor",
        actions: ["revise", "special_mass_destabilize"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_micro_ally = {
        name: "???",
        maxhp: 20,
        specialClass: "intrusiveactor",
        actions: ["mad_claw", "special_irradiate"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }
	
	env.COMBAT_ACTORS.intrusive_statusoid_mega = {
        name: "???",
        maxhp: 80,
        specialClass: "intrusiveactor",
        actions: ["revise", "special_mass_destabilize", "special_invoke_madness"],
        initialStatusEffects: [["impatient", 1], ["active_support", 1], ["visionary", 1], ["retaliation", 1], ["dull_pragmatist", 1], ["flesh_menace", 1], ["player_ethereal", 1]],
        graphic: `
            <div class="sprite-wrapper intrusive" id="%SLUG-sprite-wrapper">
                <img src="/img/sprites/flantrusive/5.gif">
            </div>
            `,
        reactions: {
            evade: ["LD C"],
            crit: [ "D ML" ],
            crit_buff: ["BL"],
            miss: ["CL"],
            dead: ["P N"],
            receive_hit: ["IL D"],
            receive_crit: ["I LB P"],
            receive_puncture: ["I A D"],
            receive_buff: ["P BD"],
            receive_destabilized: ["S", "T", "Q"],
            receive_rez: ["U P"],
            puncture: ["DL"],
            regen: ["DC"],
            destabilized: ["S", "T", "Q"],
            stun: ["NDN"],
            receive_carapace: ["E"],
            receive_fear: ["I P"],
            receive_redirection: ["PDP"],
        }
    }


// COMBAT ACTIONS
    // flesh
        // primary default
env.ACTIONS.husk_attack_player = {
    slug: "husk_attack_player",
    name: "Familiar Strike",
    type: 'target',
    desc: "'utilized warped limbs to strike target';'occasionally terrifying'",
    anim: "basic-attack",
    help: "80% -2HP, 25%C x2 + (FOES::+3T:FEAR)",
    usage: {
        act: "%USER SPRINTS AT %TARGET",
        crit: "%TARGET FACES THEIR MORTALITY",
        hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.8,
    crit: 0.25,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,

            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 3}); 
                    play('fear', 0.75);
                }
            })
        })
    }
}

        // secondary default
env.ACTIONS.speak_player = {
    slug: "speak_player",
    name: "Speak",
    type: 'target',
    desc: "'utilize remains to speak';'express aggressor signal directly'",
    help: "80% +4T:FEAR, 20%C +1T:STUN",
    anim: "skitter",
    usage: {
        act: "%USER APPROACHES %TARGET",
        crit: "%TARGET IS PARALYZED BY FEAR",
        hit: "%USER WHISPERS SOMETHING TO %TARGET",
        miss: "%TARGET RECOILS"
    },
    accuracy: 0.8,
    crit: 0.2,
    amt: 0,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'talksignal',
                rate: 1
            },
            hitExec: ()=>{
                reactDialogue(user, `give_fear`)
            },
            critSfx: {
                name: 'fear',
                rate: 0.75
            },
            critStatus: {
                name: 'stun',
                length: 1
            },
            hitStatus: {
                name: 'fear',
                length: 4
            },
        })
    }
}

        // utility default
env.ACTIONS.special_demoralize = {
    slug: "special_demoralize",
    name: "Demoralize",
    type: 'special',
    desc: "'overexert remains';'broadly express aggressor signal'",
    help: "FOES::70% +2T:FEAR, 30%C +2T:FEAR +1T:WEAKENED",
    anim: "orbshake",
    accuracy: 0.7,
    crit: 0.3,
    amt: 0,
    usage: {
        act: "%USER APPROACHES THEIR FOES"
    },
    noRepeat: true,
    exec: function(user, target, beingUsedAsync) {
        let action = this

        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
				if(actor.slug == user.slug) return;
                env.GENERIC_ACTIONS.singleTarget({
                    action: action, 
                    user, 
                    target: actor,
                    hitSfx: { name: 'talksignal' },
                    critSfx: { name: 'fear', rate: 0.75 },
                    hitStatus: {
                        name: 'fear',
                        length: 2
                    },
                    critExec: () => {
                        addStatus({origin: user, target: actor, status: "fear", length: 2}); 
                        addStatus({origin: user, target: actor, status: "weakened", length: 1}); 
                    },
                })
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

        // primary augment
env.ACTIONS.husk_necrotic = {
    slug: "husk_necrotic",
    name: "Necrotic Strike",
    type: 'target',
    desc: "'utilized rotting limbs to strike target';'guarantee of psychological trauma'",
    anim: "basic-attack",
    help: "80% -1HP, 20%C x2 + (FOES::+3T:FEAR +2T:ROT)",
    usage: {
        act: "%USER SPRINTS AT %TARGET",
        crit: "%TARGET'S TEAM ROTS BEFORE THEIR EYES",
        hit: "%TARGET IS STRUCK WITH ROTTING LIMBS",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.8,
    crit: 0.2,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,

            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 3}); 
                    addStatus({target: actor, origin: user, status: "rot", origin: user, length: 2});
                    play('fear', 0.6);
                }
            })
        })
    }
}

        // secondary augment
env.ACTIONS.player_psychosis = {
    slug: "player_psychosis",
    name: "Psychosis",
    type: 'target',
    desc: "'utilize remains to inject destructive thoughts';'eat away at foes from the inside'",
    help: "80% -1HP +3T:FEAR +2T:ROT, 10%C x2 +2T:STUN",
    anim: "skitter",
    usage: {
        act: "%USER APPROACHES %TARGET",
        crit: "%TARGET IS PARALYZED BY FEAR",
        hit: "%USER IS STRUCK, BUT BY WHAT?",
        miss: "%TARGET RECOILS"
    },
    accuracy: 0.8,
    crit: 0.1,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'talksignal',
                rate: 0.75
            },
            genExec: () => {
                addStatus({origin: user, target, status: "fear", length: 3}); 
                addStatus({origin: user, target, status: "rot", length: 2}); 
            },
            critStatus: {
                name: 'stun',
                length: 2
            },
        })
    }
}

        // utility augment
env.ACTIONS.special_player_chant = {
    slug: "special_player_chant",
    name: "█████",
    type: 'special+summon',
    desc: "'██████ ███ █████';'convey malignant thoughtforms via speech'",
    help: "FOES::70% ONE OF (+2T:FEAR, +1T:PUNCTURE, -1HP), 15%C -1HP +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)",
    anim: "orbshake",
    accuracy: 0.7,
    crit: 0.15,
    amt: 0,
    usage: {
        act: "%USER ██████ ███ █████" //unrelated but i think the action message says "SPEAKS THE TRUTH" but redacted :P
    },
    noRepeat: true,
    exec: function(user, target, beingUsedAsync) {
        let action = this
		let fated = user.statusEffects.find(status => status.slug == "fated_flesh")

        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                env.GENERIC_ACTIONS.singleTarget({
                    action: action, 
                    user, 
                    target: actor,
                    hitSfx: { name: 'talksignal' },
                    critSfx: { name: 'fear', rate: 0.75 },
                    hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "puncture", origin: user, length: 1}); 

                    } else {
                        combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
                    }
                },
                    critStatus: {
                        name: 'weakened',
                        length: 1
                    },
                    critExec: ({target}) => {
                        user.lastSide = !user.lastSide
                        if(user.team.members.filter(m=>m.slug.includes('player_hallucination')).length < (fated ? fated.power + 4 : 4)) {
                            midCombatAllyAdd('player_hallucination', user.lastSide ? "left" : "right")
                        }
						combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
                    }
                })
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

        // daemon thing
env.ACTIONS.recall = {
    slug: "recall",
    name: "Recall",
    type: 'autohit',
    desc: "'suffer from partial ruleset paradox'",
    anim: "skitter",
    help: "-1HP, +1T:STUN",
    usage: {
        act: "THE FIRMAMENT UNDOES %USER'S ACTION"
    },
    acc: 100,
    crit: -1,
    exec: function(user, target) {
        combatHit(user, {amt: 1, acc: this.accuracy, crit: this.crit, origin: user})
        addStatus({target: user, status: "stun", length: 1, noReact: true}); 
        return 'nothing';
    }
}

    env.ACTIONS.malfunction_good = {
        slug: "malfunction_good",
        name: "Malfunction",
        type: 'autohit',
        desc: "'suffer from internal deterioration'",
        anim: "skitter",
        help: "-1HP, +1T:VULNERABLE",
        usage: {
            act: "%USER'S SKIN WRITHES"
        },
        acc: 100,
        crit: -1,
        exec: function(user, target) {
            combatHit(user, {amt: 1, acc: this.accuracy, crit: this.crit, origin: user})
            addStatus({target: user, status: "vulnerable", length: 1, noReact: true});
			advanceTurn(user)
            return 'nothing';
        }
    },

    // dull
        //warped collapse actions
env.ACTIONS.foe_stab_weak = {
    slug: "foe_stab_weak",
    name: "Clumsy Swing",
    type: 'target',
    desc: "'unwieldy strike with weak limbs';'attempt to puncture vital corrucystic components'",
    help: "35% -1HP +3T:PUNCTURE -REGEN, 10%C x2 +3T:PUNCTURE",
    anim: "basic-attack",
    usage: {
        act: "%USER BLINDLY STABS %TARGET",
        crit: "%TARGET BLEEDS PROFUSELY",
        hit: "%TARGET IS CUT",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.35,
    crit: 0.1,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 1
            },
            critStatus: {
                name: 'puncture',
                length: 3
            },
            hitStatus: {
                name: 'puncture',
                length: 3
            },
        })
    }
}

env.ACTIONS.spy_weak = {
    slug: "spy_weak",
    name: "Spy",
    verb: "spy on",
    type: 'target',
    desc: "'attempt to expose enemy weakness';'increase hit and crit chances'",
    help: "80% +3T:VULNERABLE -EVASION",
    anim: "spying",
    frameClass: "temp-perspective",
    animDuration: 2000,
    usage: {
        act: "%USER SPIES UPON %TARGET",
        crit: "%TARGET IS MARKED FOR DEATH",
        hit: "%TARGET FEELS TARGETED",
        miss: "%USER LOOSES SIGHT OF %TARGET"
    },
    accuracy: 0.8,
    crit: 0,
    exec: function(user, target) {
        reactDialogue(user, `give_vulnerable`)
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'status',
                rate: 0.75
            },
            hitStatus: {
                name: 'vulnerable',
                length: 3
            },
        })
    }
}

env.ACTIONS.mend_weak = {
    slug: "mend_weak",
    name: "Clumsy Mend",
    type: 'support+target+self+autohit',
    desc: "'restore health';'heal over time';'cure puncture'",
    help: "AUTOHIT +1HP +2T:REGEN -PUNCTURE, 10%C +1HP",
    anim: "heal",
    usage: {
        act: "%USER FIXES UP %TARGET",
        crit: "%TARGET FEELS BETTER",
        hit: "%TARGET FEELS A LITTLE BETTER",
        miss: "%TARGET IS TOO SLIPPERY"
    },
    crit: 0.1,
    amt: -1,
    autohit: true,
    beneficial: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: true,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'mend',
                rate: 1
            },
            hitStatus: {
                name: 'regen',
                length: 2
            },
        })
    },

    avoidChaining: true,
    disableIf: (actor) => {
        return (
            actor.team.name == "enemy" &&
            !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
        )
    }
}

env.ACTIONS.daze_lastresort_weak = {
    slug: "daze_lastresort_weak",
    name: "Blind Bash",
    type: 'target',
    desc: "'swing self'",
    anim: "basic-attack",
    help: "25% -1HP, 25%C x2 +1T:STUN",
    usage: {
        act: "%USER SWINGS AT %TARGET",
        crit: "%TARGET IS LEFT REELING",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.25,
    crit: 0.25,
    amt: 1,
    exec: (user, target)=>{env.ACTIONS.secondary.exec(user, target)},
    
}

env.ACTIONS.stab_weak = {
    slug: "stab_weak",
    name: "Clumsy Swing",
    type: 'target',
    desc: "'unwieldy strike with weak limbs';'attempt to puncture vital corrucystic components'",
    help: "50% -1HP +3T:PUNCTURE -REGEN, 10%C -1HP +3T:PUNCTURE",
    anim: "basic-attack",
    usage: {
        act: "%USER STABS %TARGET",
        crit: "%TARGET IS EVISCERATED",
        hit: "%TARGET BLEEDS SLUDGY CORRU",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.1,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 1
            },
            critStatus: {
                name: 'puncture',
                length: 3
            },
            hitStatus: {
                name: 'puncture',
                length: 3
            },
        })
    }
}

env.ACTIONS.archival_smash_weak = {
    slug: "archival_smash",
    name: "Calculated Strike",
    type: 'target',
    desc: "'focused, deadly attack upon one target';'immense physical trauma'",
    anim: "basic-attack",
    help: "60% -3HP, 30% X2 +1T:STUN",
    usage: {
        act: "%USER CHARGES %TARGET",
        crit: "%TARGET IS LEFT REELING",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 6,
    crit: 0.3,
    amt: 3,
    exec: function(user, target) {
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'hit',
                rate: 0.8
            },
            critStatus: {
                name: 'stun',
                length: 1
            }
        })
    }
}

        //warped golem maintanence actions
env.ACTIONS.special_self_destruct_dull = {
    slug: "special_self_destruct_dull",
    name: "Hypervelocity Detonation",
    type: 'special',
    desc: "'form shrapnel in body';'propel via dull'",
    help: "FOES::70% -2HP, 20%C x2 +1T:STUN, 100% SELF -1HP",
    anim: "explode",
    accuracy: 0.7,
    crit: 0.2,
    amt: 2,
    usage: {
        act: "%USER JUST EXPLODES"
    },
    exec: function(user, target, beingUsedAsync) {
        let action = this
        play('shot5', 0.6)
        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                env.GENERIC_ACTIONS.singleTarget({
                    action: action, 
                    user, 
                    target: actor,
                    hitSfx: { name: 'shot2' },
                    critSfx: { name: 'shot6' },
                    critStatus: {
                        name: 'stun',
                        length: 1
                    },
                })

                combatHit(user, {amt: 1, accuracy: 0.5, crit: 0, origin: user, redirectable: false, runEvents: false})
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.player_husk_attack_weak = { //vanity rename for the dusk
    slug: "player_husk_attack_weak",
    name: "Familiar Brawl",
    type: 'target',
    desc: "'utilize badly warped limbs to strike foes';'occasionally terrifying'",
    anim: "basic-attack",
    help: "50% -1HP, 10%C x2 + (FOES::+2T:FEAR)",
    usage: {
        act: "%USER SPRINTS AT %TARGET",
        crit: "%TARGET FACES THEIR MORTALITY",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.1,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,

            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
                    play('fear', 0.75);
                }
            })
        })
    }
}

env.ACTIONS.speak_weak = {
    slug: "speak_weak",
    name: "Dullvoice",
    type: 'target',
    desc: "'utilize dull to speak';'express aggressor signal directly'",
    help: "65% +2T:FEAR, 10%C +1T:STUN",
    anim: "skitter",
    usage: {
        act: "%USER APPROACHES %TARGET",
        crit: "%TARGET IS PARALYZED BY FEAR",
        hit: "%USER WHISPERS SOMETHING TO %TARGET",
        miss: "%USER'S THROAT CLOSES"
    },
    accuracy: 0.65,
    crit: 0.1,
    amt: 0,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'talksignal',
                rate: 1
            },
            hitExec: ()=>{
                reactDialogue(user, `give_fear`)
            },
            critSfx: {
                name: 'fear',
                rate: 0.75
            },
            critStatus: {
                name: 'stun',
                length: 1
            },
            hitStatus: {
                name: 'fear',
                length: 2
            },
        })
    }
}

env.ACTIONS.evade_weak = {
    slug: "evade_weak",
    name: "Lesser Focus",
    type: 'autohit',
    desc: "'look for opportunity';'useful against wily foes'",
    anim: "heal",
    help: "+1T:FOCUSED -WEAKENED",
    usage: {
        act: "%USER LOOKS FOR AN OPENING"
    },
    
    exec: function(user, target) {
        play('mend', 0.66); 
        addStatus({target: user, status: "focused", length: 1, noReact: true}); 
        return 'nothing';
    },

    disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
    avoidChaining: true
}

env.ACTIONS.tozik_attack_weak = {
    slug: "tozik_attack_weak",
    name: "Warped Corruskivi",
    type: 'target',
    desc: "'utilize damaged repair tool as weapon';'chance to drain corru for health'",
    anim: "basic-attack",
    help: "50% -1HP, 20%C x2 + (ALLIES::+1HP +1T:REGEN)",
    usage: {
        act: "%USER CLAWS AT %TARGET",
        crit: "%TARGET'S LIFE IS DRAINED AWAY",
        hit: "%TARGET IS SLASHED",
        miss: "%TARGET DODGES"
    },
    accuracy: 0.5,
    crit: 0.2,
    amt: 1,
    exec: function(user, target) {
        if(env.rpg.classList.contains("tutorialgolem")) change("PAGE!!earlytoz", true)

        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 1.5
            },

            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    combatHit(actor, {amt: -1, origin: user, autohit: true, beneficial: true});
                    addStatus({target: actor, origin: user, status: "regen", length: 1});
                    play('mend')
                }
            })
        })
    }
}

env.ACTIONS.bozko_attack_weak = {
    slug: "bozko_attack_weak",
    name: "Clumsy Disable",
    type: 'target',
    desc: "'strike offensive appendages of target';'chance to greatly weaken attacks'",
    anim: "basic-attack",
    help: "40% -2HP, 30%C x2 +2T:WEAKENED",
    usage: {
        act: "%USER JABS AT %TARGET'S WEAPONRY",
        crit: "%TARGET IS CRIPPLED",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.4,
    crit: 0.3,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            critStatus: {
                name: 'weakened',
                length: 2
            }
        })
    }
}

env.ACTIONS.ik_attack_vanity = {
    slug: "ik_attack_vanity",
    name: "Veilksplitter",
    verb: "veilksplit",
    type: 'target',
    desc: "'dull-enabled cutting beam';'windup period removed due to heavy dull exposure",
    anim: "basic-attack",
    help: "AUTOHIT -4HP +1T:STUN 5%C x2",
    usage: {
        act: "%USER BLASTS %TARGET",
        crit: "%TARGET IS ANNIHILATED",
        hit: "%TARGET IS SEARED",
        miss: "%TARGET EVADES"
    },
    autohit: true,
    crit: 0.05,
    amt: 4,
    exec: function(user, target) {
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'dull',
                rate: 0.5
            },
            critSfx: {
                name: 'stab',
                rate: 0.4
            },
            genExec: ({target}) => {
                addStatus({target, status: "stun", length: 1});
            }
        })
    }
}

env.ACTIONS.dullflare_vanity = {
    slug: "dullflare_vanity",
    name: "Dull Flare",
    type: 'special',
    desc: "'wide directional release of rapidly decaying dull light';'windup period removed due to heavy dull exposure'",
    help: "FOES::AUTOHIT -3HP 10%C x2",
    anim: "basic-attack",
    autohit: true,
    crit: 0.1,
    amt: 3,
    usage: {
        act: "%USER TEARS OPEN THE DULL"
    },
    exec: function(user, target, beingUsedAsync) {
        removeStatus(user, "windup")
        let action = this
        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                let anim = env.ACTION_ANIMS.flare
                let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                let animDelay = baseDelay + anim.duration;
                    
                setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                setTimeout(function(){
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'dull', rate: 1.5 },
                        critSfx: { name: 'shot6', rate: 0.75 },
                    })
                }, animDelay);
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.spy_analyze_weak = {
    slug: "spy_analyze_weak",
    name: "Glitched Analysis",
    type: 'target',
    desc: "'expose enemy weakness';'increase hit and crit chances'",
    help: "60% +3T:VULNERABLE -EVASION",
    anim: "spying",
    frameClass: "temp-perspective",
    animDuration: 2000,
    usage: {
        act: "%USER SCANS %TARGET",
        hit: "%TARGET FEELS TARGETED",
        miss: "%TARGET HIDES BEHIND SOMETHING"
    },
    accuracy: 0.6,
    crit: 0,
    exec: (user, target)=>{env.ACTIONS.spy.exec(user, target)}
}

        //warped boss actions
env.ACTIONS.movefriend_attack_weak = {
    slug: "movefriend_attack_weak",
    name: "Slow Broadcast",
    type: 'target',
    desc: "'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'",
    anim: "wobble",
    help: "50% -2HP +1T:PUNCTURE, 25%C (FOES::-1HP +2T:VULNERABLE)",
    usage: {
        act: "%USER'S SIGIL WARPS STRANGELY",
        crit: "THE WHOLE TEAM FEELS ILL",
        hit: "%TARGET'S FLESH REVOLTS",
        miss: "%TARGET RECOILS SAFELY"
    },
    accuracy: 0.5,
    crit: 0.25,
    amt: 2,
    exec: function(user, target) {
        content.classList.add('painprep', 'painhalf')
        setTimeout(()=>{content.classList.add('painmode')}, 100)
        setTimeout(()=>{content.classList.remove('painmode')}, 2000)
        setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 3000)

        env.rpg.classList.remove('incoherentbg')

        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitStatus: {name: 'puncture', length: 1}, critStatus: {name: 'puncture', length: 1},
            
            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
                    addStatus({target: actor, status: "vulnerable", length: 2}); 
                    play("talksignal", 0.75)
                }
            })
        })
    }
}

env.ACTIONS.player_movefriend_crush = {
    slug: "player_movefriend_crush",
    name: "Crush",
    verb: "crush",
    type: 'target',
    desc: "'utilize walls to crush a target';'attempt to guarantee strike'",
    anim: "basic-attack",
    help: "80% -2HP",
    usage: {
        act: "THE WALLS GROW HOSTILE AROUND %TARGET",
        hit: "%TARGET WITHSTANDS THE STRIKE",
        miss: "%TARGET ESCAPES BY A HAIR"
    },
    accuracy: 0.8,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
        })
    }
}

env.ACTIONS.player_movefriend_annihilation = {
    slug: "player_movefriend_annihilation",
    name: "Annihilation",
    verb: "annihilate",
    type: 'target',
    desc: "'utilize walls to crush a target';'chance for immense physical trauma'",
    anim: "basic-attack",
    help: "40% -2HP, 40%C -2HP +1T:STUN",
    usage: {
        act: "THE WALLS GROW HOSTILE AROUND %TARGET",
        crit: "%TARGET BARELY STANDS",
        hit: "%TARGET DID THEIR BEST",
        miss: "%TARGET ESCAPED BY A HAIR"
    },
    accuracy: 0.4,
    crit: 0.4,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            critStatus: {
                name: 'stun',
                length: 1
            }
        })
    }
}

	env.ACTIONS.special_playershelf_annihilate_movefriend = {
        slug: "special_playershelf_annihilate_movefriend",
        name: "Annihilation",
        type: 'special+target',
        desc: "'utilize walls to crush a target';'offer user responsive choice'",
        anim: "wobble",
        help: "CHOOSE::80% -2HP ::OR:: 40% -2HP, 40%C x2 +1T:STUN",
        usage: {
            act: "THE WALLS GROW HOSTILE AROUND %TARGET",
            crit: "%TARGET BARELY STANDS",
            hit: "%TARGET DID THEIR BEST",
            miss: "%TARGET ESCAPED BY A HAIR"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
            let action = this

            //summon a div that lets the player click guaranteed or chance
            actionChoice({
                user: user,
                action: action,
                choiceText: `${user.name} lunges at ${target.name}...`,
                options: [
                    {text: "Guarantee strike", definition: "NOTE::'80% -2HP'"},
                    {text: "Try a riskier attack", definition: "NOTE::'40% -2HP, 40%C x2 +1T:STUN'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 2, acc: 0.8, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 2, acc: 0.4, crit: 0.4, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_hit')
                            play("hit", 0.75)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.75)
                            break;
                    }

                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    }
	
	env.ACTIONS.special_playershelf_annihilate_painshelf = {
        slug: "special_playershelf_annihilate_painshelf",
        name: "Annihilation",
        type: 'special+target',
        desc: "'utilize long limbs to eviscerate a target';'offer user responsive choice'",
        anim: "wobble",
        help: "CHOOSE::80% -3HP ::OR:: 40% -2HP, 40%C x2 +2T:PUNCTURE +1T:STUN",
        usage: {
            act: "%USER LUNGES AT %TARGET",
            crit: "%TARGET IS BRUTALLY STABBED",
            hit: "%TARGET TAKES A SOLID HIT",
            miss: "%TARGET ESCAPED BY A HAIR"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
            let action = this

            //summon a div that lets the player click guaranteed or chance
            actionChoice({
                user: user,
                action: action,
                choiceText: `${user.name} lunges at ${target.name}...`,
                options: [
                    {text: "Guarantee strike", definition: "NOTE::'80% -3HP'"},
                    {text: "Try a riskier attack", definition: "NOTE::'40% -2HP, 40%C x2 +2T:PUNCTURE +1T:STUN'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 3, acc: 0.8, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 2, acc: 0.4, crit: 0.4, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
							addStatus({target: target, origin: user, status: "puncture", length: 2})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_hit')
                            play("stab", 0.75)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.75)
                            break;
                    }

                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    }

env.ACTIONS.special_player_movefriendsummon = {
    slug: "special_player_movefriendsummon",
    name: "Offensive Groundsmindry",
    type: 'special+summon+nomimic',
    desc: "'utilize aggressor signal to create allies'",
    help: "SUMMON::2 WARPED TENDRILS (MAX: 2 TENDRILS)",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER FORMS WEAPONS FROM THE WALLS", target, 'none', 2000);
        play('stab', 0.5, 0.6);
        
        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_tendrils', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_tendrils', 'right')
        } else {
            midCombatAllyAdd('player_dull_tendrils', 'left')
            midCombatAllyAdd('player_dull_tendrils', 'right')
        }
        user.actions = user.actions.filter(action => action !== "special_player_movefriendsummon")
        setTimeout(()=>advanceTurn(user), 1000)
    },
}

env.ACTIONS.swipe_weak = {
    slug: "swipe_weak",
    name: "Wild Swipe",
    type: 'target',
    desc: "'swipe blindly at target';'chance for persistent wound'",
    anim: "basic-attack",
    help: "40% -1HP, 20%C x2 +1T:PUNCTURE -REGEN",
    usage: {
        act: "%USER SWIPES AT %TARGET",
        crit: "%TARGET IS STABBED",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET DUCKS OUT OF THE WAY"
    },
    accuracy: 0.4,
    crit: 0.2,
    amt: 1,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            critStatus: {
                name: 'puncture',
                length: 1
            }
        })
    }
}

env.ACTIONS.player_archiveshelf_crush = {
    slug: "player_archiveshelf_crush",
    name: "Crush",
    verb: "crush",
    type: 'target',
    desc: "'utilize long limbs to eviscerate to a target';'attempt to guarantee strike'",
    anim: "basic-attack",
    help: "90% -3HP",
    usage: {
        act: "%USER LUNGES AT %TARGET",
        hit: "%TARGET TAKES A SOLID HIT",
        miss: "%TARGET ESCAPES BY A HAIR"
    },
    accuracy: 0.9,
    amt: 3,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
        })
    }
}

env.ACTIONS.player_archiveshelf_annihilation = {
    slug: "player_archiveshelf_annihilation",
    name: "Annihilation",
    verb: "annihilate",
    type: 'target',
    desc: "'utilize long limbs to eviscerate a target';'chance for immense physical trauma'",
    anim: "basic-attack",
    help: "50% -2HP, 50%C -2HP +2T:PUNCTURE +1T:STUN",
    usage: {
        act: "%USER LUNGES AT %TARGET",
        crit: "%TARGET IS BRUTALLY STABBED",
        hit: "%TARGET TAKES A SOLID HIT",
        miss: "%TARGET ESCAPED BY A HAIR"
    },
    accuracy: 0.5,
    crit: 0.5,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            critExec: ({target})=>{
                addStatus({target, status: "stun", length: 1});
                addStatus({target, status: "puncture", length: 2});
            }
        })
    }
}

env.ACTIONS.player_special_dullauto = {
    slug: "player_special_dullauto",
    name: "Dull Auto",
    type: 'special',
    desc: "'utilize automatic rifle';'rapid inaccurate attacks'",
    anim: "wobble",
    help: "x6 RANDOM ENEMY::33% -1HP +1T:DESTABILIZED 33%C -1HP +1T:VULNERABLE",
    usage: {
        act: "%USER OPENS FIRE",
    },
    accuracy: 0.33,
    crit: 0.33,
    amt: 1,
    exec: function(user, target, beingUsedAsync) {
        let initialRate = env.bgm.rate()

        if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, initialRate + 0.5)
        play('click1')

        let targetTeam
        switch(user.team.name) {
            case "ally": targetTeam = env.rpg.enemyTeam; break;
            case "enemy": targetTeam = env.rpg.allyTeam; break;
        }

        let anim = env.ACTION_ANIMS.shoot
        let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")

        if(validTargets.length) for (let i = 0; i < 6; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
            let animDelay = baseDelay + anim.duration;
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "dull", volume: 0.5 },
                        critSfx: { name: "dull", rate: 0.75 },
                        missSfx: { name: "dull", rate: 1.5, volume: 0.5 },
                        hitStatus: {
                            name: 'destabilized',
                            length: 1
                        },
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        },
                    })
                }, animDelay)
            }
        }

        setTimeout(()=>{                
            if(!beingUsedAsync) advanceTurn(user)
            if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, env.bgm.intendedRate)
        }, (env.ADVANCE_RATE * 0.2) * 7)
    }
}

env.ACTIONS.special_player_chant_weak = {
    slug: "special_player_chant_weak",
    name: "█████",
    type: 'special+summon',
    desc: "'██████ ███ █████';'convey malignant thoughtforms via speech'",
    help: "FOES::60% -1HP, 15% x2 +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)",
    anim: "orbshake",
    accuracy: 0.6,
    crit: 0.15,
    amt: 1,
    usage: {
        act: "%USER ██████ ███ █████"
    },
    noRepeat: true,
    exec: function(user, target, beingUsedAsync) {
        let action = this

        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                env.GENERIC_ACTIONS.singleTarget({
                    action: action, 
                    user, 
                    target: actor,
                    hitSfx: { name: 'talksignal' },
                    critSfx: { name: 'fear', rate: 0.75 },
                    critStatus: {
                        name: 'weakened',
                        length: 1
                    },
                    critExec: ({target}) => {
                        user.lastSide = !user.lastSide
                        if(user.team.members.filter(m=>m.slug.includes('player_hallucination')).length < 4) {
                            midCombatAllyAdd('player_hallucination', user.lastSide ? "left" : "right")
                        }
                    }
                })
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.kivii_grasp_weak = {
    slug: "kivii_grasp_weak",
    name: "Blind Grasp",
    type: 'target',
    desc: "'attempt to immobilize and crush target';'leave open to attack'",
    anim: "basic-attack",
    help: "50% -1HP +1T:VULNERABLE, 15% x2 +2T:STUN",
    usage: {
        act: "%USER GRASPS AT %TARGET",
        crit: "%TARGET IS CRUSHED",
        hit: "%TARGET IS CAUGHT",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.15,
    amt: 1,
    exec: function(user, target) {
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'hit',
                rate: 2
            },

            hitExec: ({target})=> {
                addStatus({target, status: "vulnerable", length: 1, noReact: true});
            },

            critExec: ({target})=>{
                addStatus({target, status: "stun", length: 2}); 
            }
        })
    }
}

env.ACTIONS.golemboss_strike = {
    slug: "golemboss_strike",
    name: "STRIKE",
    type: 'target',
    desc: "'swing gauntlet at target';'chance for immense physical trauma'",
    anim: "basic-attack",
    help: "60% -4HP +2T:VULNERABLE, 20%C x2 +1T:STUN",
    usage: {
        act: "%USER SWINGS AT %TARGET",
        crit: "%TARGET IS LAUNCHED BACKWARDS",
        hit: "%TARGET IS LEFT REELING",
        miss: "%TARGET EVADES BY A HAIR"
    },
    accuracy: 0.6,
    crit: 0.2,
    amt: 4,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitStatus: {
                name: 'vulnerable',
                length: 2
            },
            critStatus: {
                name: 'stun',
                length: 1
            },
        })
    }
}

env.ACTIONS.golemboss_advance = {
    slug: "golemboss_advance",
    name: "ADVANCE",
    type: 'target',
    desc: "'swing both gauntlets at target';'may inspire additional smashing'",
    anim: "basic-attack",
    help: "50% -1HP +1T:WEAKENED, 15%C USE THIS ACTION AGAIN",
    usage: {
        act: "%USER CHARGES AT %TARGET",
        crit: "%USER JUST KEEPS GOING",
        hit: "%TARGET IS CRUSHED",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.15,
    amt: 1,
    exec: function(user, target) {
        let action = this
        return env.GENERIC_ACTIONS.singleTarget({
            action, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 0.75
            },
            critSfx: {
                name: 'stab',
                rate: 1.0
            },

            hitExec: ({target}) => {
                addStatus({target, status: "weakened", length: 1});
            },

            critExec: ({target})=> {
                if(target.hp > 0 && target.state != "lastStand") {
                    env.setTimeout(()=>{
                        useAction(user, this, target, {beingUsedAsync: true, reason: "advance"})
                    }, 400)
                }
            }
        })
    }
}

env.ACTIONS.golemboss_guard = { //basically an enemy_shell vanity rename
    slug: "golemboss_guard",
    name: "GUARD",
    type: 'autohit',
    desc: "'raise gauntlets to make simple defense';'reduce incoming attacks'",
    anim: "heal",
    help: "+2T:CARAPACE -VULNERABLE",
    usage: {
        act: "%USER RAISES THEIR GAUNTLETS"
    },
    
    exec: function(user, target) {
        play('guard', 0.75);
        addStatus({target: user, status: "carapace", length: 2, noReact: true});
        removeStatus(user, "vulnerable") 
        return 'nothing';
    },
}

env.ACTIONS.golemboss_windup = {
    slug: "golemboss_windup",
    name: "WINDUP",
    type: 'autohit',
    desc: "'prepare devastating attack';'stay behind';'lose windup if attention diverted'",
    anim: "",
    help: "+WINDUP +2T:EVASION",
    usage: {
        act: "%USER PREPARES AN ATTACK..."
    },
    noRepeat: true,
    exec: function(user, target) {
        play('dull', 1.5)
        addStatus({target: user, status: "evasion", length: 2, noReact: true}); 
        addStatus({target: user, status: "windup", length: 1}); 
        return 'nothing';
    }
}

env.ACTIONS.golemboss_strike_strong = {
    slug: "golemboss_strike_strong",
    name: "WINDUP::STRIKE",
    type: 'target',
    desc: "'swing gauntlet at target';'chance for immense physical trauma'",
    anim: "basic-attack",
    help: "90% -8HP +4T:VULNERABLE, 40%C x2 +2T:STUN",
    usage: {
        act: "%USER SWINGS AT %TARGET",
        crit: "%TARGET IS LAUNCHED BACKWARDS",
        hit: "%TARGET IS LEFT REELING",
        miss: "%TARGET EVADES BY A HAIR"
    },
    accuracy: 0.9,
    crit: 0.4,
    amt: 8,
    exec: function(user, target) {
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'hit',
                rate: 0.75
            },
            hitStatus: {
                name: 'vulnerable',
                length: 4
            },
            critStatus: {
                name: 'stun',
                length: 2
            },
        })
    }
}

env.ACTIONS.golemboss_advance_strong = {
    slug: "golemboss_advance_strong",
    name: "WINDUP::ADVANCE",
    type: 'target',
    desc: "'swing both gauntlets at target';'may inspire additional smashing'",
    anim: "basic-attack",
    help: "80% -2HP +2T:WEAKENED, 30%C USE THIS ACTION AGAIN",
    usage: {
        act: "%USER CHARGES AT %TARGET",
        crit: "%USER JUST KEEPS GOING",
        hit: "%TARGET IS CRUSHED",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.8,
    crit: 0.3,
    amt: 2,
    exec: function(user, target) {
        removeStatus(user, "windup")
        let action = this
        return env.GENERIC_ACTIONS.singleTarget({
            action, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 0.6
            },
            critSfx: {
                name: 'stab',
                rate: 0.8
            },

            hitExec: ({target}) => {
                addStatus({target, status: "weakened", length: 1});
            },

            critExec: ({target})=> {
                if(target.hp > 0 && target.state != "lastStand") {
                    env.setTimeout(()=>{
                        useAction(user, this, target, {beingUsedAsync: true, reason: "advance"})
                    }, 400)
                }
            }
        })
    }
}

env.ACTIONS.golemboss_guard_strong = { //basically an enemy_shell vanity rename
    slug: "golemboss_guard_strong",
    name: "WINDUP::GUARD",
    type: 'autohit',
    desc: "'raise gauntlets to simple defense';'reduce incoming attacks'",
    anim: "heal",
    help: "+WINDUP +4T:CARAPACE, +2T:SPIKES -VULNERABLE",
    usage: {
        act: "%USER RAISES THEIR GAUNTLETS"
    },
    
    exec: function(user, target) {
        play('guard', 0.75);
        addStatus({target: user, status: "carapace", length: 4, noReact: true});
        addStatus({target: user, status: "spikes", length: 2, noReact: true});
        removeStatus(user, "vulnerable") 
        return 'nothing';
    },
}

env.ACTIONS.golemboss_focused_strong = {
    slug: "golemboss_focused_strong",
    name: "WINDUP::FOCUS",
    type: 'autohit',
    desc: "'hold prepared attack';'look for opportunity'",
    anim: "",
    help: "+WINDUP +2T:EVASION +1T:FOCUSED -VULNERABLE -WEAKENED",
    usage: {
        act: "%USER WAITS FOR THE RIGHT MOMENT..."
    },
    avoidChaining: true,
    exec: function(user, target) {
        play('dull', 1.0);
        addStatus({target: user, status: "windup", length: 1}); 
        addStatus({target: user, status: "evasion", length: 2, noReact: true}); 
        addStatus({target: user, status: "focused", length: 1, noReact: true});
        return 'nothing';
    }
}

// warped daemon actions

env.ACTIONS.revise_weak = {
    slug: "revise_weak",
    name: "Attempt Revision",
    type: 'target',
    desc: "'strike at foes and grasp beyond flesh';'corrupt beneficial statuses'",
    anim: "basic-attack",
    help: "40% -2HP, 10%C x2 + BENEFICIAL STATUS INVERSION",
    usage: {
        act: "%USER GRASPS BEYOND %TARGET",
        crit: "A FRIGHTENING BLOW",
        hit: "%TARGET FEELS SOMETHING TORN AWAY",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.4,
    crit: 0.1,
    amt: 2,
    exec: function(user, target, beingUsedAsync) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'dull',
                rate: 1.25
            },

            critExec: ({target})=> {
                invertStatuses(target, (statusObj)=>statusObj.beneficial)
            }
        })
    }
}

env.ACTIONS.mad_claw_weak = {
    slug: "mad_claw_weak",
    name: "Clumsy Mad Claw",
    verb: "claw at",
    type: 'target',
    desc: "'utilize unpredictable weaponry';'guarantee of trauma'",
    anim: "basic-attack",
    help: "50% -2HP + ONE OF (+2T:DESTABILIZED, +2T:FEAR, +1T:STUN), 20%C x2",
    usage: {
        act: "%USER ATTACKS %TARGET",
        crit: "A FRIGHTENING BLOW",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.2,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'dull',
                rate: 1.25
            },

            hitExec: ({target})=> {
                let rand = Math.random()
                if(rand < 0.3) {
                    addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 
                    
                } else if(rand < 0.6) {
                    addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 

                } else {
                    addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                }
            }
        })
    }
}

env.ACTIONS.cripple_weak = {
    slug: "cripple_weak",
    name: "Clumsy Cripple",
    type: 'target',
    desc: "'strike neural center of target to disorient';'chance to greatly weaken attacks'",
    anim: "basic-attack",
    help: "60% -2HP +1T:STUN, 40%C x2 +2T:WEAKENED",
    usage: {
        act: "%USER JABS AT %TARGET'S WEAPONRY",
        crit: "%TARGET IS CRIPPLED",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.6,
    crit: 0.4,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            critStatus: {
                name: 'weakened',
                length: 2
            },
            hitStatus: {
                name: 'stun',
                length: 1
            },
        })
    }
}

env.ACTIONS.exploit_weak = {
    slug: "exploit_weak",
    name: "Clumsy Exploit",
    type: 'target',
    desc: "'locate or take advantage of vulnerability in foe'",
    anim: "basic-attack",
    help: "60% -1HP, 20%C x2 +2T:VULNERABLE -EVASION\nADD::-1HP IF TARGET IS VULNERABLE",
    usage: {
        act: "%USER REACHES TOWARDS %TARGET",
        crit: "%TARGET FALLS APART",
        hit: "%TARGET'S FLESH MELTS AWAY",
        miss: "%TARGET RESISTS CONTROL"
    },
    accuracy: 0.6,
    crit: 0.2,
    amt: 1,
    exec: function(user, target) {
        let amt = this.amt

        if(hasStatus(target, "vulnerable")) {
            amt = this.amt + 1
        }

        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            specialAmt: amt,
            user, 
            target,
            hitSfx: {
                name: 'destabilize',
                rate: 1.5
            },
            critStatus: {
                name: 'vulnerable',
                length: 2
            },
            critExec: ()=>{reactDialogue(user, `give_vulnerable`)}
        })
    }
}

env.ACTIONS.surge_weak = {
    slug: "surge_weak",
    name: "Lesser Surge",
    type: 'self+autohit+support',
    desc: "'charge forward without worry';'next action is taken twice'",
    anim: "",
    help: "+SURGE",
    usage: {
        act: "%USER IS ENERGIZED"
    },
    beneficial: true,
    
    disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
    exec: function(user, target) {
        play("talkchoir7", 2)
        addStatus({target: user, status: "surge", length: 1, noReact: true})
        return 'nothing'
    }, 

    avoidChaining: true
}

env.ACTIONS.parasite_weak = {
    slug: "parasite_weak",
    name: "Clumsy Parasite",
    verb: "parasitize",
    type: 'target',
    desc: "'utilize modified repair tool';'tap vital corru of foes to sustain allies'",
    anim: "basic-attack",
    help: "50% -2HP +1T:SIPHON, 30%C x2 + (FOES::+2T:SIPHON)",
    usage: {
        act: "%USER GRASPS AT %TARGET",
        crit: "%TARGET'S TEAM IS INFESTED",
        hit: "%TARGET IS INFESTED",
        miss: "%TARGET DODGES"
    },
    accuracy: 0.5,
    crit: 0.3,
    amt: 2,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 0.75
            },

            hitExec: ({target})=> {
                addStatus({target, origin: user, status: "siphon", length: 1}); 
            },

            critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "siphon", length: 2}); 
                    play('status', 0.75);
                }
            })
        })
    }
}

env.ACTIONS.enforce_weak = {
    slug: "enforce_weak",
    name: "Clumsy Enforcement",
    type: 'target',
    desc: "'relentless assault with claws';'may inspire additional smashing'",
    anim: "basic-attack",
    help: "50% -1HP +1T:OPEN WOUND +1T:PUNCTURE, 15%C USE THIS ACTION AGAIN",
    usage: {
        act: "%USER STABS %TARGET",
        crit: "%USER JUST KEEPS GOING",
        hit: "%TARGET BLEEDS SLUDGY CORRU",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.5,
    crit: 0.15,
    amt: 1,
    exec: function(user, target) {
        let action = this
        return env.GENERIC_ACTIONS.singleTarget({
            action, 
            user, 
            target,
            hitSfx: {
                name: 'hit',
                rate: 0.7
            },
            critSfx: {
                name: 'hit',
                rate: 1.5
            },

            hitExec: ({target}) => {
                addStatus({target, status: "puncture", length: 1});
                addStatus({target, status: "open_wound", length: 1});
            },

            critExec: ({target})=> {
                if(target.hp > 0 && target.state != "lastStand") {
                    env.setTimeout(()=>{
                        useAction(user, this, target, {beingUsedAsync: true, reason: "enforcement"})
                    }, 400)
                }
            }
        })
    }
}

env.ACTIONS.special_rule_weak = {
    slug: "special_rule_weak",
    name: "Attempt Adjustment",
    type: 'special',
    desc: "'utilize status control to empower and repair team';'afflict opponents with critical vulnerability'",
    help: "+WINDUP, ALLIES::+1BP +REPAIRS +1T:EMPOWERED, FOES::50% -1HP +2T:VULNERABLE +CRITICAL FLAW",
    anim: "",
    accuracy: 0.5,
    crit: 0,
    amt: 1,
    usage: {
        act: "%USER SHIFTS THE BALANCE"
    },
    exec: function(user, target, beingUsedAsync) {
        let action = this
        let allyTeam = user.team.name
        let enemyTeam = user.enemyTeam.name
        if(user.sprite) user.sprite.classList.add("basic-attack") 

        env.GENERIC_ACTIONS.teamWave({
            arbitraryActorList: env.rpg.turnOrder,
            extraDelay: 200,
            endCallback: () => {
                if(user.sprite) user.sprite.classList.remove("basic-attack")
                readoutAdd({
                    message: `${user.name} stays wound up!`, 
                    name: "sourceless", 
                    type: "sourceless combat minordetail", 
                    show: true,
                    forceMini: true,
                    sfx: false
                })
            },
            advanceAfterExec: true, beingUsedAsync, user,
            exec: (actor, i) => {
                if(actor.slug == user.slug) return;

                switch(actor.team.name) {
                    case allyTeam:
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            type: 'barrier',
                            action, 
                            user, 
                            target: actor,
                            canCrit: false,
                            hitSfx: {
                                name: 'mend',
                                rate: 2
                            },
                            hitStatus: {
                                name: 'repairs',
                                length: 1
                            },
                        })
                    break

                    case enemyTeam:
                        env.GENERIC_ACTIONS.singleTarget({
                            action: this, 
                            user, 
                            target: actor,
                            hitSfx: {
                                name: 'talkcroak',
                                rate: 2
                            },
                            canCrit: false,
                            hitExec: (target) => {
                                addStatus({origin: user, target: actor, status: "vulnerable", length: 2}); 
                                addStatus({origin: user, target: actor, status: "critical_flaw", length: 1}); 
                            }
                        })                            
                    break
                }
            }
        })
    }
}

env.ACTIONS.daemon_wound = {
    slug: "daemon_wound",
    name: "Wound",
    type: 'target',
    desc: "'focused attack on vitals';'increase pain of target'",
    anim: "basic-attack",
    help: "80% -3HP +4T:OPEN WOUND, 20%C x2 +2T:STUN",
    usage: {
        act: "%USER CHARGES %TARGET",
        crit: "%TARGET IS LEFT REELING",
        hit: "%TARGET IS STRUCK",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.8,
    crit: 0.2,
    amt: 3,
    exec: function(user, target) {
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 0.8
            },
            hitStatus: {
                name: 'open_wound',
                length: 4
            },
            critStatus: {
                name: 'stun',
                length: 2
            }
        })
    }
}

env.ACTIONS.special_judgement_weak = {
    slug: "special_judgement_weak",
    name: "Continuous Rewrite",
    type: 'special',
    desc: "'utilize thoughtspace influence to empower massive strike'",
    help: "+WINDUP, 70% -2HP, 30%C x2 +2T:DESTABILIZED +2T:FEAR",
    anim: "",
    accuracy: 0.7,
    crit: 0.3,
    amt: 2,
    usage: {
        act: "%USER TURNS THE MEMORY AGAINST YOUR FOES"
    },
    exec: function(user, target, beingUsedAsync) {
        let action = this
        if(user.sprite) user.sprite.classList.add("basic-attack")

        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            extraDelay: 150,
            endCallback: () => {
                if(user.sprite) user.sprite.classList.remove("basic-attack")
                readoutAdd({
                        message: `${user.name} stays wound up!`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: true,
                        forceMini: true,
                        sfx: false
                    })
                },
            exec: (actor, i) => {
                if(actor.slug == user.slug) return
                env.GENERIC_ACTIONS.singleTarget({
                    action, 
                    user, 
                    target: actor,
                    hitSfx: {
                        name: 'dull',
                        rate: 1
                    },
                    hitExec: ({target})=>{
                        addStatus({target, origin: user, status: "destabilized", length: 2})
                        addStatus({target, origin: user, status: "fear", length: 2})
                    }                
                })
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.special_player_kiviisummon = {
    slug: "special_player_kiviisummon",
    name: "Retrieve Gauntlets",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere'",
    help: "SUMMON::2 WARPED GAUNTLETS (MAX: 2 GAUNTLETS)",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER DRAGS THEIR GAUNTLETS INTO POSITION", target, 'none', 2000);
        play('crit', 0.7, 0.9);
        
        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_kivii_gauntlet', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_kivii_gauntlet', 'right')
        } else {
            midCombatAllyAdd('player_dull_kivii_gauntlet', 'left')
            midCombatAllyAdd('player_dull_kivii_gauntlet', 'right')
        }
        user.actions = user.actions.filter(action => action !== "special_player_kiviisummon")
        setTimeout(()=>advanceTurn(user), 1000)
    }
}

env.ACTIONS.special_player_daemon_guard = {
    slug: "special_player_daemon_guard",
    name: "Idolatry",
    type: 'special',
    desc: "'intercept all attacks on allies';'prepare to take great damage'",
    help: "ALLIES::+3T:REDIRECTION (TO USER), +3T:CARAPACE +3T:SPIKES -VULNERABLE",
    anim: "basic-attack",
    accuracy: 1,
    crit: 0,
    usage: {
        act: "%USER BLESSES THEIR TEAM"
    },
    exec: function(user, target, beingUsedAsync) {
        reactDialogue(user, `give_redirection`)

        addStatus({target: user, status: "carapace", length: 3, noReact: true}); 
        addStatus({target: user, status: "spikes", length: 3}); 
        removeStatus(user, "vulnerable") 

        env.GENERIC_ACTIONS.teamWave({
            team: user.team,
            exec: (actor, i) => {
                if(actor.slug == user.slug) return
                addStatus({target: actor, origin: user, status: "redirection", length: 3}); 
                play('guard', 1.33, 0.6);
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.special_daemon_fullauto = {
    slug: "player_special_daemon_fullauto",
    name: "Full Auto",
    type: 'special',
    desc: "'utilize automatic rifle';'prioritize accuracy'",
    anim: "wobble",
    help: "x6 RANDOM ENEMY::75% -1HP 20%C -1HP +1T:VULNERABLE",
    usage: {
        act: "%USER OPENS FIRE",
    },
    accuracy: 0.75,
    crit: 0.2,
    amt: 1,
    exec: function(user, target, beingUsedAsync) {
        let initialRate = env.bgm.rate()

        if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, initialRate + 0.5)
        play('click1')

        let targetTeam
        switch(user.team.name) {
            case "ally": targetTeam = env.rpg.enemyTeam; break;
            case "enemy": targetTeam = env.rpg.allyTeam; break;
        }

        let anim = env.ACTION_ANIMS.shoot
        let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")

        if(validTargets.length) for (let i = 0; i < 6; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
            let animDelay = baseDelay + anim.duration;
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "shot2", volume: 0.5 },
                        critSfx: { name: "shot6" },
                        missSfx: { name: "shot2", rate: 1.5, volume: 0.5 },
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        },
                    })
                }, animDelay)
            }
        }

        setTimeout(()=>{                
            if(!beingUsedAsync) advanceTurn(user)
            if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, env.bgm.intendedRate)
        }, (env.ADVANCE_RATE * 0.2) * 7)
    }
}

env.ACTIONS.daemon_windup = {
    slug: "daemon_windup",
    name: "Rev Up",
    type: 'autohit',
    desc: "'prepare devastating attack';'briefly lose defensive focus'",
    anim: "",
    help: "+WINDUP",
    usage: {
        act: "%USER PREPARES AN ATTACK..."
    },
    exec: function(user, target) {
        play('talklaugh', 0.5);
        addStatus({target: user, status: "windup", length: 1}); 
        return 'nothing';
    }
}

env.ACTIONS.special_daemon_fullerauto = {
    slug: "special_daemon_fullerauto",
    name: "Fuller Auto",
    type: 'special',
    desc: "'utilize automatic rifle';'greatly enhance rate of fire';'best paired with FLOOR IT'",
    anim: "wobble",
    help: "x12 RANDOM ENEMY::33% -1HP 33%C -1HP +1T:VULNERABLE",
    usage: {
        act: "%USER OPENS FIRE",
    },
    accuracy: 0.66,
    crit: 0.33,
    amt: 1,
    exec: function(user, target, beingUsedAsync) {
        let initialRate = env.bgm.rate()

        if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, initialRate + 0.5)
        play('click1')

        let targetTeam
        switch(user.team.name) {
            case "ally": targetTeam = env.rpg.enemyTeam; break;
            case "enemy": targetTeam = env.rpg.allyTeam; break;
        }

        let anim = env.ACTION_ANIMS.shoot
        let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")

        if(validTargets.length) for (let i = 0; i < 12; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.1) * i)
            let animDelay = baseDelay + anim.duration;
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "shot2", volume: 0.5 },
                        critSfx: { name: "shot6" },
                        missSfx: { name: "shot2", rate: 1.5, volume: 0.5 },
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        },
                    })
                }, animDelay)
            }
        }

        setTimeout(()=>{                
            if(!beingUsedAsync) advanceTurn(user)
            if(!env.rpg.classList.contains("standoff")) ratween(env.bgm, env.bgm.intendedRate)
        }, (env.ADVANCE_RATE * 0.2) * 13)
    }
}

env.ACTIONS.daemon_floor_it = {
    slug: "daemon_floor_it",
    name: "Floor It",
    type: 'support+target+self+autohit',
    desc: "'restore health and instill great energy';'heal over time';'cure puncture'",
    help: "AUTOHIT +1HP +2T:REGEN +FLOOR IT -PUNCTURE, 20%C +1HP",
    anim: "heal",
    usage: {
        act: "%USER FIXES UP %TARGET",
        crit: "%TARGET HAS A BURST OF ENERGY",
        hit: "%TARGET IS READY TO FIGHT",
        miss: "%TARGET IS TOO SLIPPERY"
    },
    crit: 0.2,
    amt: -1,
    autohit: true,
    beneficial: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: true,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'mend',
                rate: 0.66
            },

            hitExec: ({target})=> {
                addStatus({target, origin: user, status: "regen", length: 2, noReact: true})
                addStatus({target, origin: user, status: "floor_it", length: 1, noReact: true})
            },
        })
    }
}

env.ACTIONS.daemon_cull = {
    slug: "daemon_cull",
    name: "Cull",
    type: 'support+target+self+autohit',
    desc: "'slight damage';'apply one effect from wide array of negative statuses';'best used by PROCESS'",
    help: "100% -1HP ONE OF (+2T:FEAR, +2T:VULNERABLE, +2T:WEAKENED, +2T:OPEN WOUND, +2T:SIPHON, +3T:PUNCTURE, +2T:DESTABILIZED, +1T:STUN), 10%C x2",
    anim: "basic-attack",
    usage: {
        act: "%USER REACHES BEYOND %TARGET",
        crit: "%TARGET FEELS WAY WORSE",
        hit: "%TARGET FEELS WORSE",
        miss: "%TARGET IS TOO SLIPPERY"
    },
    crit: 0.1,
    amt: 1,
    accuracy: 1,
    beneficial: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: false,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'stab',
                rate: 2
            },
           hitExec: ({target})=> {
                let rand = Math.random()
                if(rand < 0.125) {
                    addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 
                    
                } else if(rand < 0.25) {
                    addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 

                } else if(rand < 0.375) {
                    addStatus({target, origin: user, status: "weakened", origin: user, length: 2}); 

                } else if(rand < 0.5) {
                    addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 

                } else if(rand < 0.625) {
                    addStatus({target, origin: user, status: "siphon", origin: user, length: 2}); 

                } else if(rand < 0.75) {
                    addStatus({target, origin: user, status: "puncture", origin: user, length: 3}); 

                } else if(rand < 0.875) {
                    addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 

                } else {
                    addStatus({target, origin: user, status: "stun", origin: user, length: 1});
                }
            },
        })
    },
}

env.ACTIONS.daemon_tesselate = {
    slug: "daemon_tesselate",
    name: "Tesselate",
    type: 'support+target+self+autohit',
    desc: "'restore health';'apply one effect from wide array of beneficial statuses';'best used with RENDER'",
    help: "AUTOHIT +1HP ONE OF (+1T:FOCUSED, +2T:EVASION, +2T:EMPOWERED, +2T:CARAPACE, +2T:SPIKES, +3T:REGEN, +SURGE, +FLOOR IT), 10%C +1HP",
    anim: "heal",
    usage: {
        act: "%USER FIXES UP %TARGET",
        crit: "%TARGET FEELS WAY BETTER",
        hit: "%TARGET FEELS BETTER",
        miss: "%TARGET IS TOO SLIPPERY"
    },
    crit: 0.1,
    amt: -1,
    autohit: true,
    beneficial: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: true,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'mend',
                rate: 2
            },
           hitExec: ({target})=> {
                let rand = Math.random()
                if(rand < 0.125) {
                    addStatus({target, origin: user, status: "focused", origin: user, length: 1}); 
                    
                } else if(rand < 0.25) {
                    addStatus({target, origin: user, status: "evasion", origin: user, length: 2}); 

                } else if(rand < 0.375) {
                    addStatus({target, origin: user, status: "empowered", origin: user, length: 2}); 

                } else if(rand < 0.5) {
                    addStatus({target, origin: user, status: "carapace", origin: user, length: 2}); 

                } else if(rand < 0.625) {
                    addStatus({target, origin: user, status: "spikes", origin: user, length: 2}); 

                } else if(rand < 0.75) {
                    addStatus({target, origin: user, status: "regen", origin: user, length: 3}); 

                } else if(rand < 0.875) {
                    addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 

                } else {
                    addStatus({target, origin: user, status: "floor_it", origin: user, length: 1});
                }
            },
        })
    },
}

env.ACTIONS.daemon_plot = {
    slug: "daemon_plot",
    name: "Calculate",
    type: 'autohit',
    desc: "'hide vulnerability';'prepare great opportunity'",
    anim: "",
    help: "+8T:EVASION -VULNERABLE",
    usage: {
        act: "%USER WATCHES CAREFULLY"
    },
    
    exec: function(user, target) {
        play('mend', 0.5);
        addStatus({target: user, status: "evasion", length: 8, noReact: true});  
        return 'nothing';
    },

    disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
    avoidChaining: true
}

env.ACTIONS.special_daemon_enact_cpu = {
    slug: "special_daemon_enact_cpu",
    name: "Process",
    type: 'special',
    desc: "'finalize calculations';'unleash flurry of attacks upon foes'",
    anim: "basic-attack",
    verb: "render upon",
    help: "UTILIZE PRIMARY ON RANDOM FOES xT:EVASION TIMES, SELF::-EVASION",
    autohit: true,
    noRepeat: true,
    exec: function(user, target) {
        let amt = Math.floor(hasStatus(target, 'evasion'))
        removeStatus(user, "evasion")
        let primary = env.ACTIONS[user.actions[0]]
        actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

        for (let i = 0; i < amt; i++) {
            env.setTimeout(()=>{
                let target = env.rpg.enemyTeam.members.filter(t=>t.state != "dead").sample()
                if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
            }, i * 200)
        }

        env.setTimeout(()=>{
            advanceTurn(user)
        }, (amt * 200) + 500)
    },
    disableIf: (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" },
}

env.ACTIONS.special_daemon_enact_gpu = {
    slug: "special_daemon_enact_gpu",
    name: "Render",
    type: 'special',
    desc: "'finalize calculations';'unleash flurry of buffs upon allies'",
    anim: "basic-attack",
    verb: "render upon",
    help: "UTILIZE PRIMARY ON RANDOM ALLIES xT:EVASION TIMES, SELF::-EVASION",
    autohit: true,
    noRepeat: true,
    exec: function(user, target) {
        let amt = Math.floor(hasStatus(target, 'evasion'))
        removeStatus(user, "evasion")
        let primary = env.ACTIONS[user.actions[0]]
        actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

        for (let i = 0; i < amt; i++) {
            env.setTimeout(()=>{
                let target = env.rpg.allyTeam.members.filter(t=>t.state != "dead").sample()
                if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
            }, i * 200)
        }

        env.setTimeout(()=>{
            advanceTurn(user)
        }, (amt * 200) + 500)
    },
    disableIf: (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" },
}

    env.ACTIONS.special_greater_tesselate = {
        slug: "special_greater_tesselate",
        name: "Greater Tesselation",
        type: 'autohit+support',
        desc: "'restore health';'apply one effect from wide array of beneficial statuses';'best paired with SURGE'",
        anim: "",
        help: "ALLIES::AUTOHIT +2HP ONE OF (+2T:FOCUSED, +4T:EVASION, +4T:EMPOWERED, +4T:CARAPACE, +4T:SPIKES, +6T:REGEN, +SURGE, +FLOOR IT)",
        usage: {
            act: "%USER FIXES UP THEIR TEAM"
        },
        autohit: true,
		amt: -2,
        exec: function(user, target) {
            play("talkchoir7", 2)

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
						let rand = Math.random()
						if(rand < 0.125) {
							addStatus({target, origin: user, status: "focused", origin: user, length: 2}); 
							
						} else if(rand < 0.25) {
							addStatus({target, origin: user, status: "evasion", origin: user, length: 4}); 

						} else if(rand < 0.375) {
							addStatus({target, origin: user, status: "empowered", origin: user, length: 4}); 

						} else if(rand < 0.5) {
							addStatus({target, origin: user, status: "carapace", origin: user, length: 4}); 

						} else if(rand < 0.625) {
							addStatus({target, origin: user, status: "spikes", origin: user, length: 4}); 

						} else if(rand < 0.75) {
							addStatus({target, origin: user, status: "regen", origin: user, length: 6}); 

						} else if(rand < 0.875) {
							addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 

						} else {
							addStatus({target, origin: user, status: "floor_it", origin: user, length: 1});
						}
                    play('mend', 1);
                }
            })
            return 'nothing'
        }
    }

    env.ACTIONS.special_greater_cull = {
        slug: "special_greater_cull",
        name: "Greater Culling",
        type: 'autohit+special',
        desc: "'slight damage';'apply one effect from wide array of negative statuses';'best paired with SURGE'",
        anim: "",
        help: "'FOES::100% -2HP ONE OF (+4T:FEAR, +4T:VULNERABLE, +4T:WEAKENED, +4T:OPEN WOUND, +4T:SIPHON, +6T:PUNCTURE, +2T:STUN, +WEAK POINT)'",
        usage: {
            act: "%USER REACHES BEYOND THEIR FOES"
        },
        accuracy: 1,
		amt: 2,
        exec: function(user, target) {
            play("talkfairy", 1)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
						let rand = Math.random()
						if(rand < 0.125) {
							addStatus({target, origin: user, status: "fear", origin: user, length: 4}); 
							
						} else if(rand < 0.25) {
							addStatus({target, origin: user, status: "vulnerable", origin: user, length: 4}); 

						} else if(rand < 0.375) {
							addStatus({target, origin: user, status: "weakened", origin: user, length: 4}); 

						} else if(rand < 0.5) {
							addStatus({target, origin: user, status: "open_wound", origin: user, length: 4}); 

						} else if(rand < 0.625) {
							addStatus({target, origin: user, status: "siphon", origin: user, length: 4}); 

						} else if(rand < 0.75) {
							addStatus({target, origin: user, status: "puncture", origin: user, length: 6}); 

						} else if(rand < 0.875) {
							addStatus({target, origin: user, status: "stun", origin: user, length: 2}); 

						} else {
							addStatus({target, origin: user, status: "weak_point", origin: user, length: 1});
						} 
                    play('talksignal', 1);
                }
            })
            return 'nothing'
        }
    }

env.ACTIONS.rez_player = { 
    slug: "rez_player",
    name: "Unfair Advantage",
    type: 'support+target+self+rez+autohit',
    desc: "'repair ally to fighting condition';'used only as last resort'",
    help: "AUTOHIT +25%HP -DOWN",
    anim: "heal",
    usage: {
        act: "%USER FIXES UP %TARGET",
        crit: "%TARGET FEELS WAY BETTER",
        hit: "%TARGET FEELS BETTER",
        miss: "%TARGET IS TOO SLIPPERY"
    },
    autohit: true,
    crit: 0.1,
    amt: 0,
    itemAction: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: true,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'mend',
                rate: 0.5
            },
            genExec: ({target})=>{
                if(target.state == "dead") {
                    target.hp = target.maxhp * 0.25
                    combatRevive(target)
                    reactDialogue(target, 'receive_rez')
                }
            }
        })
    },
}

env.ACTIONS.special_dullsummon_weak = {
    slug: "special_dullsummon_weak",
    name: "Risky Portal",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere'",
    help: "SUMMON::2 DULL CONTAINER (MAX: 12 SUMMONS)",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER CONJURES CONTAINERS VIA THE DULL", target, 'none', 2000);
        play('dull', 0.8, 1);
        
        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_container', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_container', 'right')
        } else {
            midCombatAllyAdd('player_dull_container', 'left')
            midCombatAllyAdd('player_dull_container', 'right')
        }
        addStatus({target: user, status: "destabilized", length: 2, noReact: true});

        setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.length > 15) return "TOO MANY ALLIES" }
}

    env.ACTIONS.special_chant_mega_weak = {
        slug: "special_chant_mega_weak",
        name: "New Process",
        type: 'special+summon',
        desc: "'remove resources from foes to create new daemon processes'",
        help: "FOES::70% -2HP, 20% x2 +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)",
        anim: "spinny",
        accuracy: 0.7,
        crit: 0.2,
        amt: 2,
        usage: {
            act: "%USER DRAWS IN RESOURCES"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'talksignal' },
                        critSfx: { name: 'fear', rate: 0.75 },
                        critStatus: {
                            name: 'weakened',
                            length: 1
                        },
                        critExec: ({target}) => {
                            user.lastSide = !user.lastSide
                            env.hallucinator = target.slug
                            if(user.team.members.filter(m=>m.slug.includes('player_critta_spawner_bee')).length < 4) {
                                midCombatAllyAdd('player_critta_spawner_bee', user.lastSide ? "left" : "right")
                            }
                        }
                    })
                    
                }, 
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

    env.ACTIONS.daemon_smash = {
        slug: "daemon_smash",
        name: "Deleterious Strike",
        type: 'target',
        desc: "'focused, deadly attack upon one target';'attempt to remove target from memory'",
        anim: "basic-attack",
        help: "100% -5HP, 50% x2 +2T:STUN +10T:ROT +4T:DESTABILIZED +4T:VULNERABLE +4T:FEAR +CRITICAL FLAW +MADNESS",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS FADES FROM MEMORY",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.5,
        amt: 5,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.75
                },
                critExec: ({target})=> {
                    addStatus({target, origin: user, status: "stun", length: 2})
                    addStatus({target, origin: user, status: "rot", length: 10, noReact: true})
					addStatus({target, origin: user, status: "fear", length: 4, noReact: true})
					addStatus({target, origin: user, status: "madness", length: 1, noReact: true})
                    addStatus({target, origin: user, status: "vulnerable", length: 4, noReact: true})
                    addStatus({target, origin: user, status: "critical_flaw", length: 1, noReact: true})
                }
            })
        }
    },
	//warped actions end here
	
	//metal summon actions
    env.ACTIONS.special_barrier_allies_player = { //god damn it why does the if sprite line break if the user doesn't have a sprite >:(
        slug: "special_barrier_allies_player",
        name: "Cover",
        type: 'special',
        desc: "'apply ablative protection'",
        help: "ALLIES::+2 BP",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 2,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },
        beneficial: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
        
        //disable if you're an enemy and anyone on your team has more than 5 bp
        //also if you're an enemy and you're the last standing
        //mainly to avoid repeat/infinite stacking while dealing with a crowd
        disableIf: (actor)=>{
            if(actor.team.name == "ally") return false;
            else if(!actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))) return true;
            else return actor.team.members.some(member => ((member != actor) && member.bp >= 5))
        }
    },
	
	env.ACTIONS.windup_winderup = {
        slug: "windup_winderup",
        name: "Second Preparation",
        type: 'autohit',
        desc: "'continue to prepare devastating attack';'briefly lose defensive focus'",
        anim: "",
        help: "+WINDUP+",
        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },
        exec: function(user, target) {
            play('talklaugh', 0.45);
            addStatus({target: user, status: "winderup", length: 1}); 
            return 'nothing';
        }
    },
	
	env.ACTIONS.windup_windestup = {
        slug: "windup_windestup",
        name: "Third Preparation",
        type: 'autohit',
        desc: "'continue to prepare devastating attack';'briefly lose defensive focus'",
        anim: "",
        help: "-WINDUP+, +WINDUP++",
        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },
        exec: function(user, target) {
            play('talklaugh', 0.4);
            addStatus({target: user, status: "windestup", length: 1}); 
            return 'nothing';
        },
		disableIf: (actor)=>{
			if (hasStatus(actor, "windestup" || "final_windup")) return
			else if(!hasStatus(actor,"winderup")) return "REQUIRES WINDUP+"
		}
    },
	
	env.ACTIONS.windup_final_windup = {
        slug: "windup_final_windup",
        name: "Final Preparation",
        type: 'autohit',
        desc: "'finalize attack preparation';'briefly lose defensive focus'",
        anim: "",
        help: "-WINDUP++, +WINDUP+++",
        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },
        exec: function(user, target) {
            play('talklaugh', 0.35);
            addStatus({target: user, status: "final_windup", length: 1}); 
            return 'nothing';
        },
		disableIf: (actor)=>{
			if (hasStatus(actor,"final_windup")) return
			else if(!hasStatus(actor,"windestup")) return "REQUIRES WINDUP++"
		}
    },

	env.ACTIONS.berserk_mega_golem = {
        slug: "berserk_mega_golem",
        name: "Taunt",
        type: 'autohit',
        desc: "'self-modify for maximum offense';'tempt foes into striking recklessly'",
        help: "+1T:DENATURED +2T:SERRATIONS -VULNERABLE",
        anim: "heal",
        usage: {
            act: "%USER MELTS INTO A MORE AGGRESSIVE SHAPE"
        },
        
        exec: function(user, target) {
            play('destabilize', 0.5);
            removeStatus(user, "vulnerable"); 
			removeStatus(user, "windup"); 
            addStatus({target: user, status: "denatured", length: 1, noReact: true}); 
            addStatus({target: user, status: "serrations", length: 2, noReact: true}); 
            return 'nothing';
        }
    },

    env.ACTIONS.special_self_destruct_mega = {
        slug: "special_self_destruct_mega",
        name: "Self Destruct",
        type: 'special',
        desc: "'form shrapnel in body';'propel through unsustainable means'",
        help: "FOES::70% -2HP +2T:PUNCTURE, 20%C x2 +1T:OPEN WOUND\nSELF::-1HP",
        anim: "explode",
        accuracy: 0.7,
        crit: 0.2,
        amt: 2,
        usage: {
            act: "%USER JUST EXPLODES"
        },
        exec: function(user, target, beingUsedAsync) {
			removeStatus(user, "windup")
            let action = this
            play('shot5', 0.6)
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: {
							name: 'shot2', 
							rate: 0.75
							},
                        critSfx: {
							name: 'shot6',
							rate: 0.75
							},
						hitStatus: {
							name: 'puncture',
							length: 2
						},
                        critStatus: {
                            name: 'open_wound',
                            length: 1
                        },
                    })

                    combatHit(user, {amt: 1, accuracy: 1, crit: 0, origin: user, redirectable: false, runEvents: false})
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

	env.ACTIONS.foe_stab_metal = {
        slug: "foe_stab_metal",
        name: "Eviscerate",
        type: 'target',
        desc: "'puncture vital cystic component';'damage over time';'stop regen'",
        help: "80% -3HP +4T:PUNCTURE -REGEN, 20%C x2 +4T:PUNCTURE, ONE OF (+2T:OPEN WOUND, +2T:WEAKENED, +1T:STUN)",
        anim: "basic-attack",
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%TARGET IS EVISCERATED",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.2,
        amt: 3,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },
                hitStatus: {
					name: 'puncture',
					length: 4
				},
                critExec: ({target})=> {
					addStatus({target, origin: user, status: "puncture", length: 4});
					let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "weakened", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
				},
            })
        }
    }

	env.ACTIONS.attack_smash = {
        slug: "attack_smash",
        name: "Smash",
        type: 'target',
        desc: "'improvised strike';'may accidentally cause immense damage'",
        anim: "basic-attack",
        help: "100% -4HP, 20%C x2",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.2,
        amt: 4,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.75
                }
            })
        }
    }
	
	env.ACTIONS.barrier_mega = {
        slug: "barrier_mega",
        name: "Barrier",
        verb: "shield",
        type: 'support+target+self+autohit',
        desc: "'apply ablative corru layer'",
        help: "AUTOHIT +5BP, 10%C +5BP",
        anim: "heal",
        usage: {
            act: "%USER SHIELDS %TARGET",
            crit: "%TARGET FEELS INVINCIBLE",
            hit: "%TARGET GAINS A BARRIER",
            miss: "IT DOES NOT STICK"
        },
        crit: 0.1,
        autohit: true,
        amt: 5,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                type: 'barrier',
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1.25
                },
            })
        }
    }
	
	env.ACTIONS.ultra_spy_analyze = {
        slug: "ultra_spy_analyze",
        name: "Depth Scan",
        verb: "scan",
        type: 'target',
        desc: "'expose extreme enemy weakness';'increase hit and crit chances';'additional chance for severe damage'",
        help: "AUTOHIT +3T:VULNERABLE +CRITICAL FLAW -EVASION",
        anim: "spying",
        frameClass: "temp-perspective",
        animDuration: 2000,
        usage: {
            act: "%USER SPIES UPON %TARGET",
            crit: "%TARGET IS MARKED FOR DEATH",
            hit: "%TARGET IS MARKED FOR DEATH",
            miss: "%TARGET HIDES BEHIND SOMETHING"
        },
        autohit: true,
        crit: 0,
        exec: function(user, target) {
			removeStatus(user, "windup")
            reactDialogue(user, `give_vulnerable`)
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                genExec: () => {
                    addStatus({origin: user, target, status: "vulnerable", length: 3}); 
                    addStatus({origin: user, target, status: "critical_flaw", length: 1}); 
                }
            })
        }
    }

	env.ACTIONS.special_limited_carapace_bonus = {
        slug: "special_limited_carapace_bonus",
        name: "Expend carapace",
        type: 'support+target+autohit',
        desc: "'deploy shielding around target ally';'single-use'",
        help: "AUTOHIT +6T:CARAPACE +6T:SPIKES, ONE USE PER COMBAT",
        anim: "heal",
        usage: {
            act: "%USER ATTACHES THEIR SHIELDS TO %TARGET",
            crit: "%TARGET FEELS INVINCIBLE",
            hit: "%TARGET LOOKS MORE HARDY",
            miss: "SOMETHING BROKE LOL"
        },
        autohit: true,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                beneficial: true,
                user, 
                target,
                hitSfx: {
                    name: 'status',
                    rate: 0.75
                },
                hitExec: ({target})=>{
                    addStatus({target, status: "carapace", length: 6, noReact: true});
					addStatus({target, status: "spikes", length: 6, noReact: true});
                },
                genExec: ({user})=>{
                    user.windupActions = user.windupActions.filter(action => action !== "special_limited_carapace_bonus")
                    if(user.sprite) {
                        let bodySprite = user.sprite.querySelector('.golemsprite-body')
                        if(bodySprite) bodySprite.src = bodySprite.src.replace('-body','-body-used')
                    }
                }
            })
        }
    }
	
	env.ACTIONS.special_restorative_barrier_metal = { //basically a vanity rename
        slug: "special_restorative_barrier_metal",
        name: "Mending Cover",
        type: 'special',
        desc: "'apply ablative protection';'upgrades protection to passively repair'",
        help: "ALLIES::+2 BP +REPAIRS",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 2,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },
        exec: function(user, target, beingUsedAsync) {
			removeStatus(user, "windup")
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                        hitStatus: {
                            name: 'repairs',
                            length: 1
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    }
	
	env.ACTIONS.stab_metal = {
        slug: "stab_metal",
        name: "Eviscerate",
        type: 'target',
        desc: "'puncture vital cystic component';'damage over time';'stop regen'",
        help: "100% -3HP +4T:PUNCTURE -REGEN, 20%C x2 +4T:PUNCTURE, ONE OF (+2T:OPEN WOUND, +2T:WEAKENED, +1T:STUN)",
        anim: "basic-attack",
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%TARGET IS EVISCERATED",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.2,
        amt: 3,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },
                hitStatus: {
					name: 'puncture',
					length: 4
				},
                critExec: ({target})=> {
					addStatus({target, origin: user, status: "puncture", length: 4});
					let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "weakened", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
				},
            })
        }
    }
	
	env.ACTIONS.cripple_metal = {
        slug: "cripple_metal",
        name: "Neural Strike",
        type: 'target',
        desc: "'strike neural center of target to disorient';'chance to greatly weaken attacks'",
        anim: "basic-attack",
        help: "100% -3HP +1T:STUN, 40%C x2 +4T:WEAKENED",
        usage: {
            act: "%USER JABS AT %TARGET'S WEAPONRY",
            crit: "%TARGET IS CRIPPLED",
            hit: "%TARGET IS PARALYZED",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 3,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
				hitSfx: {
					name: 'hit',
					rate: 0.75
				},
                critStatus: {
                    name: 'weakened',
                    length: 4
                },
                hitStatus: {
                    name: 'stun',
                    length: 1
                },
            })
        }
    }

    env.ACTIONS.special_guard_all_metal = {
        slug: "special_guard_all_metal",
        name: "Frontline",
        type: 'special',
        desc: "'attain hyper-awareness of proceedings';'intercept all attacks on allies'",
        help: "ALLIES::+4T:REDIRECTION (TO USER)",
        anim: "basic-attack",
        accuracy: 1,
        crit: 0,
        usage: {
            act: "%USER STANDS BEFORE THEIR FOES"
        },
        exec: function(user, target, beingUsedAsync) {
			removeStatus(user, "windup")
            reactDialogue(user, `give_redirection`)
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    addStatus({target: actor, origin: user, status: "redirection", length: 4}); 
                    play('guard', 2, 0.75);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    }
	
	env.ACTIONS.mend_metal = {
        slug: "mend_metal",
        name: "Mend",
        type: 'support+target+self+autohit',
        desc: "'restore health';'heal over time';'cure puncture'",
        help: "AUTOHIT +4HP +5T:REGEN -PUNCTURE, 10%C x2",
        anim: "heal",
        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS TOO SLIPPERY"
        },
        crit: 0.1,
        amt: -4,
        autohit: true,
        beneficial: true,
        exec: function(user, target) {
			removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 0.75
                },
                hitStatus: {
                    name: 'regen',
                    length: 5
                },
            })
        },

        avoidChaining: true,
        disableIf: (actor) => {
            return (
                actor.team.name == "enemy" &&
                !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
            )
        }
    }
	
	env.ACTIONS.tozik_attack_metal = {
        slug: "tozik_attack_metal",
        name: "Vivisect",
        type: 'target',
        desc: "'utilize golem repair tool as weapon';'chance to drain corru for health'",
        anim: "basic-attack",
        help: "100% -2HP +2T:PUNCTURE, 30%C x2 + (ALLIES::+2HP +2T:REGEN)",
        usage: {
            act: "%USER CLAWS AT %TARGET",
            crit: "%TARGET'S LIFE IS DRAINED AWAY",
            hit: "%TARGET IS BADLY SLASHED",
            miss: "%TARGET DODGES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 2,
        exec: function(user, target) {
			removeStatus(user, "windup")
            if(env.rpg.classList.contains("tutorialgolem")) change("PAGE!!earlytoz", true)

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
				hitStatus: {
					name: 'puncture',
					length: 2
				},

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.team,
                    exec: (actor, i)=>{
                        combatHit(actor, {amt: -2, origin: user, autohit: true, beneficial: true});
                        addStatus({target: actor, origin: user, status: "regen", length: 2});
                        play('mend')
                    }
                })
            })
        }
    }

    env.ACTIONS.restore_metal = { 
        slug: "restore_metal",
        name: "Restore",
        type: 'support+target+self+rez+autohit',
        desc: "'restore health';'cure puncture';'repair downed target'",
        help: "AUTOHIT +5HP +3T:REGEN -PUNCTURE + (DOWNED: -DOWN, +2T:EVASION), 10%C +5HP +3T:REGEN",
        anim: "heal",
        usage: {
            act: "%USER FIXES UP %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS TOO SLIPPERY"
        },
        autohit: true,
        crit: 0.1,
        amt: -5,
        itemAction: true,
        exec: function(user, target) {
			removeStatus(user, "windup")
            let heal = {name: 'regen', length: 3}
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                critStatus: heal, hitStatus: heal,
                hitSfx: {
                    name: 'mend',
                    rate: 1
                },
                genExec: ({target})=>{
                    if(target.state == "dead") {
                        target.hp = 5
                        combatRevive(target)
                        reactDialogue(target, 'receive_rez')
                        addStatus({target: target, origin: user, status: "evasion", length: 2, noReact: true}); 
                        addStatus({target: target, origin: user, status: "regen", length: heal.length, noReact: true}); 
                    }
                }                
            })
        },
		disableIf: (actor)=>{ if(!hasStatus(actor,"winderup")) return "REQUIRES WINDUP+" },
    }

    env.ACTIONS.archival_smash_mega = {
        slug: "archival_smash_mega",
        name: "Massive Strike",
        type: 'target',
        desc: "'devastating attack upon one target';'immense physical trauma'",
        anim: "basic-attack",
        help: "100% -8HP +1T:VULNERABLE, 40%C x2 +2T:STUN +2T:OPEN WOUND",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS OBLITERATED",
            hit: "%TARGET IS LEFT REELING",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 8,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.66
                },
				hitStatus: {
					name: 'vulnerable',
					length: 1
				},
                critExec: ({target})=> {
                    addStatus({target, status: "stun", length: 2});
					addStatus({target, status: "open_wound", length: 2, noReact: true});
                },
            })
        },
		disableIf: (actor)=>{ if(!hasStatus(actor,"winderup")) return "REQUIRES WINDUP+" },
    }

    env.ACTIONS.brawl_metal = {
        slug: "brawl_metal",
        name: "Brawl",
        verb: "brawl with",
        type: 'target',
        desc: "'unwieldy punch';'last resort'",
        anim: "basic-attack",
        help: "90% -2HP, 10%C x2",
        usage: {
            act: "%USER ATTACKS %TARGET",
            hit: "%TARGET IS STRUCK",
			crit: "A FRIGHTENING BLOW",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.9,
		crit: 0.1,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
            })
        }
    }
	
    env.ACTIONS.cavernhammer = {
        slug: "cavernhammer",
        name: "Cavernhammer",
        verb: "hammer",
        type: 'target',
        desc: "'dull-enabled excavation tool';'short, intense pulse of dull radiation';'immense physical trauma'",
        anim: "basic-attack",
        help: "AUTOHIT -8HP +2T:STUN 10%C x2 +1T:STUN",
        usage: {
            act: "%USER BLASTS %TARGET",
            crit: "%TARGET IS ANNIHILATED",
            hit: "%TARGET IS SEARED",
            miss: "%TARGET EVADES"
        },
        autohit: true,
        crit: 0.1,
        amt: 8,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot7',
                    rate: 0.5
                },
                critSfx: {
                    name: 'stab',
                    rate: 0.4
                },
				critStatus: {
					name: 'stun',
					length: 1
				},
                genExec: ({target}) => {
                    addStatus({target, status: "stun", length: 2});
                }
            })
        },
		disableIf: (actor)=>{
			if (hasStatus(actor, "windestup" || "final_windup")) return
			else if(!hasStatus(actor,"winderup")) return "REQUIRES WINDUP+"
		}
    }

    env.ACTIONS.quick_forge = {
        slug: "quick_forge",
        name: "Quick Forge",
        type: 'special',
        desc: "'improvised method of smelting via dull light';'deconstructs foes'",
        help: "FOES::AUTOHIT -4HP +2T:OPEN WOUND 10%C x2",
        anim: "basic-attack",
        autohit: true,
        crit: 0.1,
        amt: 4,
        usage: {
            act: "%USER TEARS OPEN THE DULL"
        },
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.3) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'dull', rate: 1 },
                            critSfx: { name: 'shot6', rate: 0.6 },
							hitStatus: {
								name: 'open_wound',
								length: 2
							},
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
		disableIf: (actor)=>{
			if (hasStatus(actor, "windestup" || "final_windup")) return
			else if(!hasStatus(actor,"winderup")) return "REQUIRES WINDUP+"
		}
    }
	
    env.ACTIONS.veilkruka = {
        slug: "veilkruka",
        name: "Veilkruka",
        verb: "blast",
        type: 'target',
        desc: "'for emergencies';'overexert golem to create dull blast';'chance to detonate foes';'deals self damage'",
        anim: "basic-attack",
        help: "AUTOHIT -12HP +3T:STUN 15%C (FOES::AUTOHIT -6HP +1T:STUN)\nSELF:: -6HP",
        usage: {
            act: "%USER BLASTS %TARGET",
            crit: "%TARGET'S TEAM EXPLODES",
            hit: "%TARGET IS ANNIHILATED",
            miss: "%TARGET EVADES"
        },
        autohit: true,
        crit: 0.15,
        amt: 12,
        exec: function(user, target) {
			combatHit(user, {amt: 6, acc: this.accuracy, crit: 0, origin: user})
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'shot7',
                    rate: 0.5
                },
                critSfx: {
                    name: 'stab',
                    rate: 0.4
                },
                genExec: ({target}) => {
                    addStatus({target, status: "stun", length: 2});
                },
				critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        combatHit(actor, {amt: 6, crit: 0, autohit: true, origin: user});
                        addStatus({target: actor, status: "stun", length: 1}); 
                        play("shot", 0.75)
                    }
                })
            })
        },
		disableIf: (actor)=>{
			if (hasStatus(actor, "final_windup")) return
			else if(!hasStatus(actor,"windestup")) return "REQUIRES WINDUP++"
		}
    }
	
    env.ACTIONS.incinerate = {
        slug: "incinerate",
        name: "Incinerate",
        type: 'special',
        desc: "'improvised method of waste disposal';'deconstructs foes';'deals self damage'",
        help: "FOES::AUTOHIT -5HP +4T:OPEN WOUND +3T:PUNCTURE 10%C x2\nSELF:: -1HP",
        anim: "basic-attack",
        autohit: true,
        crit: 0.1,
        amt: 5,
        usage: {
            act: "%USER TEARS OPEN THE DULL"
        },
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.4) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'dull', rate: 0.75 },
                            critSfx: { name: 'shot6', rate: 0.5 },
							genExec: ({actor})=>{
								addStatus({target, status: "open_wound", length: 4, noReact: true}); 
								addStatus({target, status: "puncture", length: 3, noReact: false}); 
							}
                        })
						combatHit(user, {amt: 2, accuracy: this.accuracy, crit: 0, origin: user, redirectable: false, runEvents: false})
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
		disableIf: (actor)=>{
			if (hasStatus(actor, "final_windup")) return
			else if(!hasStatus(actor,"windestup")) return "REQUIRES WINDUP++"
		}
    }

    env.ACTIONS.cavernsplitter = {
        slug: "cavernsplitter",
        name: "Cavernsplitter",
        verb: "cavernsplit",
        type: 'target',
        desc: "'massively overcharged dull pulse';'significant self damage'",
        anim: "basic-attack",
        help: "AUTOHIT -16HP +4T:STUN 20%C x2 (FOES::AUTOHIT -8HP +2T:STUN +3T:OPEN WOUND +3T:PUNCTURE)\nSELF:: -16HP, +1T:STUN",
        usage: {
            act: "%USER BLASTS %TARGET",
            crit: "%TARGET DUST ON THE WIND",
            hit: "%TARGET IS ANNIHILATED",
            miss: "%TARGET EVADES"
        },
        autohit: true,
        crit: 0.2,
        amt: 16,
        exec: function(user, target) {
			combatHit(user, {amt: 16, acc: this.accuracy, crit: 0, origin: user})
			addStatus({user, status: "stun", length: 1});
			play('shot7', 0.4)
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.4
                },
                critSfx: {
                    name: 'shot7',
                    rate: 0.33
                },
                genExec: ({target}) => {
                    addStatus({target, status: "stun", length: 4});
                },
				critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        combatHit(actor, {amt: 8, crit: 0, autohit: true, origin: user});
                        addStatus({target: actor, status: "stun", length: 2}); 
						addStatus({target: actor, status: "open_wound", length: 3});
						addStatus({target: actor, status: "puncture", length: 3}); 
                        play("shot", 0.55)
                    }
                })
            })
        },
		disableIf: (actor)=>{if(!hasStatus(actor,"final_windup")) return "REQUIRES WINDUP+++"}
    }

    env.ACTIONS.immolate = {
        slug: "immolate",
        name: "Immolate",
        type: 'special',
        desc: "'broadly exhaust all stored dull radiation';'significant self damage'",
        help: "FOES::AUTOHIT -6HP +1T:STUN +6T:OPEN WOUND +6T:PUNCTURE 10%C x2\nSELF:: -3HP",
        anim: "basic-attack",
        autohit: true,
        crit: 0.1,
        amt: 6,
        usage: {
            act: "%USER TEARS OPEN THE DULL"
        },
        exec: function(user, target, beingUsedAsync) {
            removeStatus(user, "windup")
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.5) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'dull', rate: 0.5 },
                            critSfx: { name: 'shot6', rate: 0.4 },
							genExec: ({actor})=>{
								addStatus({target, status: "stun", length: 1, noReact: true}); 
								addStatus({target, status: "open_wound", length: 6, noReact: true}); 
								addStatus({target, status: "puncture", length: 6, noReact: false}); 
							}
                        })
						combatHit(user, {amt: 3, accuracy: this.accuracy, crit: 0, origin: user, redirectable: false, runEvents: false})
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
		disableIf: (actor)=>{if(!hasStatus(actor,"final_windup")) return "REQUIRES WINDUP+++"}
    }
	
	//husk actions start here
	env.ACTIONS.husk_attack_ichor = {
        slug: "husk_attack_ichor",
        name: "Familiar Corruskivi",
        type: 'target',
        desc: "'utilize warped repair tool as weapon';'chance to drain corru for extra damage'",
        anim: "basic-attack",
        help: "80% -2HP, 20%C x2 + (FOES::+2T:PUNCTURE +1T:FEAR)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.2,
        amt: 2,
        exec: function(user, target) {

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1.5
                },

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 1}); 
						addStatus({target: actor, origin: user, status: "puncture", origin: user, length: 2}); 
                        play('stab', 0.6);
                    }
                })
            })
        }
    },
	
    env.ACTIONS.speak_ichor = {
        slug: "speak_ichor",
        name: "Siphon",
        type: 'target',
        desc: "'tap vital corru of target to sustain allies'",
        anim: "basic-attack",
        help: "AUTOHIT +3T:SIPHON",
        usage: {
            act: "%USER GRASPS AT %TARGET",
            crit: "%TARGET'S TEAM IS INFESTED",
            hit: "%TARGET IS INFESTED",
            miss: "%TARGET DODGES"
        },
        autohit: true,
        amt: 0,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 0.75
                },

                hitExec: ({target})=> {
                    addStatus({target, origin: user, status: "siphon", length: 3}); 
                }
            })
        }
    },
	
	env.ACTIONS.husk_attack_eyes = {
        slug: "husk_attack_eyes",
        name: "Familiar Exploit",
        type: 'target',
        desc: "'utilized warped limbs to locate vulnerability in target';'occasionally terrifying'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (FOES::+1T:FEAR +2T:VULNERABLE)\nADD::-2HP IF TARGET IS VULNERABLE",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {
			let amt = this.amt

            if(hasStatus(target, "vulnerable")) {
                amt = this.amt + 2
            }
			
            return env.GENERIC_ACTIONS.singleTarget({ 
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 1}); 
						addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 2}); 
                        play('status', 0.7);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.special_enact_pain = {
        slug: "special_enact_pain",
        name: "Enact",
        type: 'special',
        desc: "'enact plan';'unleash flurry of strikes upon foes'",
        anim: "basic-attack",
        verb: "enact upon",
        help: "UTILIZE PRIMARY ON RANDOM FOES xT:EVASION TIMES, SELF::-EVASION",
        autohit: true,
        noRepeat: true,
        exec: function(user, target) {
            let amt = Math.floor(hasStatus(target, 'evasion'))
            removeStatus(user, "evasion")
			let primary = env.ACTIONS[user.actions[0]]
			if (hasStatus(user, "windup")) (primary = env.ACTIONS[user.windupActions[0]])
            actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

            for (let i = 0; i < amt; i++) {
                env.setTimeout(()=>{
                    let target = user.enemyTeam.members.filter(t=>t.state != "dead").sample()
                    if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
                }, i * 200)
            }

            env.setTimeout(()=>{
                advanceTurn(user)
            }, (amt * 200) + 500)
        },
        disableIf: (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" },
    },
	
	env.ACTIONS.husk_attack_claws = {
        slug: "husk_attack_claws",
        name: "Familiar Bomb",
        verb: "throw at",
        type: 'target',
        desc: "'utilize rapid-formed micro-explosive';'chance for terrifying explosion'",
        anim: "basic-attack",
        help: "90% -1HP, 50%C x2 (FOES::90% -1HP +2T:FEAR)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "SHRAPNEL SPRINGS AROUND THE ROOM",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET DODGES"
        },
        accuracy: 0.9,
        crit: 0.5,
        amt: 1,
        exec: function(user, target) {
            let action = this;
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i) => {
                        env.GENERIC_ACTIONS.singleTarget({
                            action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot4' },
                            hitStatus: {
                                name: 'fear',
                                length: 2
                            },
                            canCrit: false
                        })
                    }
                })
            })
        }
    },
	
	env.ACTIONS.bite_weak = {
        slug: "bite_weak",
        name: "Bite",
        type: 'target',
        desc: "'become unreasonable';'transfer illness'",
        anim: "basic-attack",
        help: "100% -1HP +3T:ROT + TRANSFER T:ROT TO TARGET, 10%C x2 +3T:ROT",
        accuracy: 1,
        usage: {
            act: "%USER BITES %TARGET",
            hit: "%TARGET FEELS HORRIBLE",
			crit: "%TARGET SHAMBLES AS IF VIOLENTLY ILL",
			miss: "%USER CONTROLS THEMSELVES"
        },
        crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'chomp',
                    rate: 1
                },
				
				critSfx: {
					name: 'chomp',
					rate: 0.55
				},
				
				critStatus: {
					name: 'rot',
					length: 3
				},

                genExec: ()=> {
                    let pow = hasStatus(user, "rot")
                    if(pow) removeStatus(user, "rot")

                    addStatus({target, origin: user, status: "rot", length: 3 + pow});
                }
            })
        }
    },
	
	env.ACTIONS.husk_attack_bone = {
        slug: "husk_attack_bone",
        name: "Familiar Break",
        type: 'target',
        desc: "'utilized warped limbs to strike target';'occasionally terrifying'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (FOES::+1T:FEAR, +2T:WEAKENED)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 1}); 
						addStatus({target: actor, origin: user, status: "weakened", origin: user, length: 2}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.speak_bone = {
        slug: "speak_bone",
        name: "Speak",
        type: 'target',
        desc: "'utilize remains to speak';'express aggressor signal directly'",
        help: "80% +2T:WEAKENED, 30%C +1T:STUN",
        anim: "skitter",
        usage: {
            act: "%USER APPROACHES %TARGET",
            crit: "%TARGET IS PARALYZED BY FEAR",
            hit: "%USER WHISPERS SOMETHING TO %TARGET",
            miss: "%TARGET RECOILS"
        },
        accuracy: 0.8,
        crit: 0.3,
        amt: 0,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'talksignal',
                    rate: 1
                },
                hitExec: ()=>{
                    reactDialogue(user, `give_fear`)
                },
                critSfx: {
                    name: 'fear',
                    rate: 0.75
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                },
                hitStatus: {
                    name: 'weakened',
                    length: 2
                },
            })
        }
    },
	
	env.ACTIONS.husk_attack_light = {
        slug: "husk_attack_light",
        name: "Familiar Claw",
        type: 'target',
        desc: "'utilized warped limbs to strike target';'occasionally terrifying'",
        anim: "basic-attack",
        help: "70% -2HP, 5%C x2 + (FOES::+2T:FEAR +1T:STUN)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.05,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
				hitSfx: {
					name: 'dull',
					length: 1
				},

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
						addStatus({target: actor, origin: user, status: "stun", origin: user, length: 1}); 
                        play('talkfairy', 0.33);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.speak_light = {
        slug: "speak_light",
        name: "Speak",
        type: 'target',
        desc: "'utilize remains to speak';'express aggressor signal directly'",
        help: "80% ONE OF (+2T:DESTABILIZED, +2T:FEAR, +1T:STUN), 10%C ONE OF (+2T:DESTABILIZED, +2T:FEAR, +1T:STUN)",
        anim: "skitter",
        usage: {
            act: "%USER APPROACHES %TARGET",
            crit: "%TARGET IS PARALYZED BY FEAR",
            hit: "%USER WHISPERS MADNESS SOMETHING TO %TARGET",
            miss: "%TARGET RECOILS"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 0,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'talksignal',
                    rate: 1
                },
                hitExec: ()=>{
                    reactDialogue(user, `give_fear`)
                },
                critSfx: {
                    name: 'talkfairy',
                    rate: 0.5
                },
                critExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
                },
                hitExec: ({target})=> {
                    let rand1 = Math.random()
                    if(rand1 < 0.3) {
                        addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 
                        
                    } else if(rand1 < 0.6) {
                        addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
                },
            })
        }
    },
	
	env.ACTIONS.husk_attack_dull = {
        slug: "husk_attack_dull",
        name: "Familiar Blade",
        type: 'target',
        desc: "'utilized warped dull blade to strike target';'obliterate destabilized foes'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (FOES::+1T:FEAR +2T:DESTABILIZED)\nIF TARGET IS DESTABILIZED::80% -3HP, 30%C x2 + (FOES::-1HP, +2T:FEAR +2T:WEAKENED)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS SEARED WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {
			let amt = this.amt
            let crit = this.crit

            if(hasStatus(target, "destabilized")) {
                amt = this.amt + 1
                crit = this.crit + .2
            }
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
					if(hasStatus(target, "destabilized")) {
						addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
						addStatus({target: actor, origin: user, status: "weakened", origin: user, length: 2});
						combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
						play('talksignal', 0.75);
                    } else {
							addStatus({target: actor, origin: user, status: "fear", origin: user, length: 1}); 
							addStatus({target: actor, origin: user, status: "destabilized", origin: user, length: 2}); 
							play('destabilize', 0.85);
						}
                    }
                })
            })
        }
    },
	
	env.ACTIONS.speak_dull = {
        slug: "speak_dull",
        name: "Dullvoice",
        type: 'target',
        desc: "'utilize remains to speak';'express aggressor signal directly'",
        help: "80% +2T:DESTABILIZED, 10%C +1T:STUN\nIF TARGET IS DESTABILIZED::100% -1HP +2T:DESTABILIZED +2T:FEAR, 30%C x2 +1T:STUN",
        anim: "skitter",
        usage: {
            act: "%USER APPROACHES %TARGET",
            crit: "%TARGET IS PARALYZED BY FEAR",
            hit: "%USER WHISPERS SOMETHING TO %TARGET",
            miss: "%TARGET RECOILS"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 0,
        exec: function(user, target) {
			let amt = this.amt
            let crit = this.crit
			let acc = this.accuracy

            if(hasStatus(target, "destabilized")) {
                amt = this.amt + 1
                crit = this.crit + .2
				acc = this.accuracy + .2
            }
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'destabilize',
                    rate: 1
                },
                hitExec: ()=>{
                    reactDialogue(user, `give_fear`)
					if(hasStatus(target, "destabilized")) {
                        addStatus({target, origin: user, status: "destabilized", length: 2, noReact: true});
						addStatus({target, origin: user, status: "fear", length: 2, noReact: true});
						combatHit(target, {amt: 1, crit: 0, autohit: true, origin: user});
                    }
					else { 
					addStatus({target, origin: user, status: "destabilized", length: 2, noReact: true});
					}
                },
                critSfx: {
                    name: 'fear',
                    rate: 0.75
                },
                critStatus: {
                    name: 'stun',
                    length: 1
                },
				critExec: ()=>{
					if(hasStatus(target, "destabilized")) {
					combatHit(target, {amt: 1, crit: 0, autohit: true, origin: user});
					} else return
				},
            })
        }
    },
	
	env.ACTIONS.husk_smash = {
        slug: "husk_smash",
        name: "Calculated Strike",
        type: 'target',
        desc: "'focused, deadly attack with warped limbs';'immense psychological trauma'",
        anim: "basic-attack",
        help: "100% -4HP, 40% x2 + (FOES::+3T:FEAR +3T:PRONE)",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET'S TEAM IS LEFT REELING",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 4,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.8
                },
				critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 3}); 
						addStatus({target: actor, origin: user, status: "prone", origin: user, length: 3}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.husk_attack_hands = {
        slug: "husk_attack_hands",
        name: "Familiar Corikuva",
        type: 'target',
        desc: "'defile ceremonial weaponry';'occasionally terrifying'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (FOES::+1T:FEAR, +2T:CURSED)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 1}); 
						addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 2}); 
                        play('talkfairy', 0.75);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.falseprayer = {
        slug: "falseprayer",
        name: "Unholy Prayer",
        type: 'target',
        desc: "'make plea to chosen deity';'many detrimental outcomes'",
        help: "80% ONE OF (-3HP +3T:PUNCTURE, +2T:VULNERABLE +1T:STUN, +2T:FEAR +1T:WEAKENED, +3T:CURSED), 10%C CHOOSE ANOTHER RANDOM EFFECT",
        anim: "skitter",
        usage: {
            act: "%USER PRAYS AGAINST %TARGET",
            crit: "%TARGET FEELS JUDGED",
            hit: "%TARGET FEELS ILL",
            miss: "%TARGET RECOILS"
        },
        crit: 0.1,
        accuracy: 0.8,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
				hitSfx: {
					name: "talkfairy",
					rate: 0.8
				},
				critSfx: {
					name: "talkfairy",
					rate: 0.4
				},
                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.25) {

                        addStatus({target, origin: user, status: "puncture", origin: user, length: 3}); 
                        combatHit(target, {amt: 3, origin: user, autohit: true, beneficial: true});
                    } else if(rand < 0.5) {

                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 
						addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    } else if(rand < 0.75) {

                        addStatus({target, origin: user, status: "fear", origin: user, length: 2});
						addStatus({target, origin: user, status: "weakened", origin: user, length: 1});
                    } else {

						addStatus({target, origin: user, status: "cursed", origin: user, length: 3}); 
					}
                },
				critExec: ({target})=> {
                    let rand1 = Math.random()
                    if(rand1 < 0.25) {

                        addStatus({target, origin: user, status: "puncture", origin: user, length: 3}); 
                        combatHit(target, {amt: 3, origin: user, autohit: true, beneficial: true});
                    } else if(rand1 < 0.5) {

                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 
						addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    } else if(rand1 < 0.75) {

                        addStatus({target, origin: user, status: "fear", origin: user, length: 2});
						addStatus({target, origin: user, status: "weakened", origin: user, length: 1});
                    } else {

						addStatus({target, origin: user, status: "cursed", origin: user, length: 3}); 
					}
                },
            })
        },

        avoidChaining: true,
        disableIf: (actor) => {
            return (
                actor.team.name == "enemy" &&
                !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
            )
        }
    }
	
	env.ACTIONS.eviscerate_better = {
        slug: "eviscerate_better",
        name: "Eviscerate",
        type: 'target',
        desc: "'boldly assault target';'target previously inflicted wounds for additional damage'",
        anim: "basic-attack",
        help: "80% -1HP +2T:PUNCTURE, 10%C x2 +2T:PUNCTURE\nADD::-1HP PER 1T:PUNCTURE",
        usage: {
            act: "%USER CLAWS AT %TARGET",
            crit: "%TARGET IS TORN APART",
            hit: "%TARGET IS TORN APART",
            miss: "%TARGET RECOILS"
        },
        accuracy: 0.8,
		crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            let specialAmt = 1 + Math.floor(hasStatus(target, 'puncture'))
            
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                specialAmt,
				hitSfx: {
					name: 'stab',
					rate: 0.8
				},
				critSfx: {
					name: 'stab',
					rate: 0.5
				},
				hitStatus: {
					name: 'puncture',
					length: 2
				},
				critStatus: {
					name: 'puncture',
					length: 2
				},
            })
        }
    },
	//secri actor actions
	env.ACTIONS.secri_crush = { //basically a vanity reskin of warped pain shelf's old annihilation
		slug: "secri_crush",
		name: "Crush",
		verb: "crush",
		type: 'target',
		desc: "'utilize long limbs to eviscerate a target';'chance for immense physical trauma'",
		anim: "basic-attack",
		help: "50% -2HP, 50%C -2HP +2T:PUNCTURE +1T:STUN",
		usage: {
			act: "%USER LUNGES AT %TARGET",
			crit: "%TARGET IS BRUTALLY STABBED",
			hit: "%TARGET TAKES A SOLID HIT",
			miss: "%TARGET ESCAPED BY A HAIR"
		},
		accuracy: 0.5,
		crit: 0.5,
		amt: 2,
		exec: function(user, target) {
			return env.GENERIC_ACTIONS.singleTarget({
				action: this, 
				user, 
				target,
				critExec: ({target})=>{
					addStatus({target, status: "stun", length: 1});
					addStatus({target, status: "puncture", length: 2});
				}
			})
		}
	}
	
	env.ACTIONS.special_fullauto_secri = {
		slug: "special_fullauto_secri",
		name: "Wild Frenzy",
		type: 'special',
		desc: "'utilize long limbs';'rapid inaccurate attacks'",
		anim: "wobble",
		help: "x6 RANDOM ENEMY::33% -1HP +2T:PUNCTURE 33%C x2 +2T:PUNCTURE",
		usage: {
			act: "%USER UNLEASHES A FLURRY OF SWINGS",
		},
		accuracy: 0.33,
		crit: 0.33,
		amt: 1,
		exec: function(user, target, beingUsedAsync) {
			let initialRate = env.bgm.rate()

			play('click1')

			let targetTeam
			switch(user.team.name) {
				case "ally": targetTeam = env.rpg.enemyTeam; break;
				case "enemy": targetTeam = env.rpg.allyTeam; break;
			}

			let anim = env.ACTION_ANIMS.shoot
			let validTargets = targetTeam.members.filter(member => member.state != "dead" && member.state != "lastStand")

			if(validTargets.length) for (let i = 0; i < 6; i++) {
				let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
				let animDelay = baseDelay + anim.duration;
				if(validTargets) {
					let target = validTargets.sample()
					
					setTimeout(()=>anim.exec(this, user, target), baseDelay)
					setTimeout(()=>{
						env.GENERIC_ACTIONS.singleTarget({
							action: this,
							user,
							target,
							hitSfx: { name: "stab", rate: 1.5, volume: 0.5 },
							critSfx: { name: "stab", rate: 0.75 },
							missSfx: { name: "miss", rate: 1.5, volume: 0.5 },
							hitStatus: {
								name: 'puncture',
								length: 2
							},
							critStatus: {
								name: 'puncture',
								length: 2
							},
						})
					}, animDelay)
				}
			}

			setTimeout(()=>{
				if(!beingUsedAsync) advanceTurn(user)
			}, (env.ADVANCE_RATE * 0.2) * 7)
		}
	}
	
	env.ACTIONS.special_secri_infest = {
        slug: "special_secri_infest",
        name: "Infest",
        type: 'special',
        desc: "'eject microscopic spores';'cause decay in foes'",
        help: "FOES::40% -1HP +3T:ROT, 10% x2 +3T:ROT +2T:FEAR",
        anim: "orbshake",
        accuracy: 0.4,
        crit: 0.1,
        amt: 1,
        usage: {
            act: "%USER INFESTS THEIR FOES"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'talksignal', rate: 1 },
                        critSfx: { name: 'stab', rate: 0.75 },
                        hitStatus: {
                            name: 'rot',
                            length: 3
                        },
                        critExec: ({target}) => {
							addStatus({target: user, status: "rot", length: 3, noReact: true})
							addStatus({target: user, status: "fear", length: 2})
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.husk_attack_impulse = {
        slug: "husk_attack_impulse",
        name: "Familiar Strike",
        type: 'target',
        desc: "'utilized warped limbs to strike target';'occasionally terrifying'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (TARGET TEAM::+2T:FEAR)",
        usage: {
            act: "%USER SPRINTS AT %TARGET",
            crit: "%TARGET FACES THEIR MORTALITY",
            hit: "%TARGET IS STRUCK WITH BROKEN LIMBS",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: target.team,
                    exec: (actor, i)=>{
                        addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2}); 
                        play('fear', 0.75);
                    }
                })
            })
        }
    },
	
	env.ACTIONS.intrusive_smash_weak = {
        slug: "intrusive_smash_weak",
        name: "Unnatural Claw",
        verb: "claw at",
        type: 'target',
        desc: "'utilize unpredictable weaponry';'guarantee of trauma'",
        anim: "basic-attack",
        help: "70% -2HP + ONE OF (+2T:OPEN WOUND, +3T:VULNERABLE +CRITICAL FLAW, +1T:STUN), 30%C x2",
        usage: {
            act: "%USER ATTACKS %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.7,
        crit: 0.3,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 1.25
                },

                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 3}); 
						addStatus({target, origin: user, status: "critical_flaw", origin: user, length: 1}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
                }
            })
        }
    },
	
	env.ACTIONS.windup_surge = {
        slug: "windup_surge",
        name: "Prepare Surge",
        type: 'autohit',
        desc: "'prepare pair of devastating attacks';'briefly lose defensive focus'",
        anim: "",
        help: "+WINDUP +SURGE",
        usage: {
            act: "%USER PREPARES AN ATTACK..."
        },
        exec: function(user, target) {
            play('talkchoir7', 2);
            addStatus({target: user, status: "windup", length: 1}); 
			addStatus({target: user, status: "surge", length: 1}); 
            return 'nothing';
        }
    },
	
	env.ACTIONS.detonate_weak = {
        slug: "detonate_weak",
        name: "Detonate",
        type: 'target',
        desc: "'detonate to instantly destroy target'",
        anim: "basic-attack",
        help: "AUTOHIT -10HP, DESTROY SELF\nONCE PER COMBAT",
        usage: {
            act: "%USER EXPLODES NEAR %TARGET",
            hit: "%TARGET IS DESTROYED",
        },
        autohit: true,
        amt: 10,
        exec: function(user, target) {
            user.hp = 0
            user.detonated = true
            updateStats({actor: user})
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.66
                },
            })
        },
        disableIf: (actor)=>{ if(actor.detonated) return "ONCE PER COMBAT" },
    },
	
    env.ACTIONS.detonate_mega = {
        slug: "detonate_mega",
        name: "Detonate",
        type: 'special',
        desc: "'detonate to instantly destroy target'",
        help: "FOES::AUTOHIT -100000000000000HP, DESTROY SELF\nONCE PER COMBAT",
        anim: "basic-attack",
        autohit: true,
        amt: 100000000000000,
        usage: {
            act: "%USER EXPLODES"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.1) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'dull', rate: 0.5 },
                            critSfx: { name: 'shot6', rate: 0.75 },
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.trusive_smash_weak = { //just here so that it can be used with surge :P
        slug: "trusive_smash_weak",
        name: "Unnatural Claw",
        verb: "claw at",
        type: 'target',
        desc: "'utilize unpredictable weaponry';'guarantee of trauma'",
        anim: "basic-attack",
        help: "70% -2HP + ONE OF (+2T:OPEN WOUND, +3T:VULNERABLE +CRITICAL FLAW, +1T:STUN), 30%C x2",
        usage: {
            act: "%USER ATTACKS %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.7,
        crit: 0.3,
        amt: 2,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 1.25
                },

                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 3}); 
						addStatus({target, origin: user, status: "critical_flaw", origin: user, length: 1}); 

                    } else {
                        addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
                    }
                }
            })
        }
    },
	
    env.ACTIONS.special_surge_allies_mega = {
        slug: "special_surge_allies_mega",
        name: "Surging Offense",
        type: 'special',
        desc: "'inspire allies to attack madly'",
        help: "ALLIES::+SURGE +2T:FOCUSED",
        anim: "heal",
        autohit: true,
        crit: 0,
        usage: {
            act: "%USER COMMANDS THEIR ALLIES TO STRIKE"
        },
        exec: function(user, target, beingUsedAsync) {
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {

                    play("talkchoir7", 2)
                    addStatus({target: actor, status: "surge", length: 1});
					addStatus({target: actor, status: "focused", length: 2});
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

	// dull actions
env.ACTIONS.ik_attack_weak = {
    slug: "ik_attack_weak",
    name: "Dull Blade",
    type: 'target',
    desc: "'utilize dull-enhanced cutting blade';'obliterate destabilized foes'",
    anim: "basic-attack",
    help: "80% -2HP, 20%C x2 +2T:VULNERABLE\nIF TARGET IS DESTABILIZED:: 90% -4HP +2T:WEAKENED, 50%C x2 +2T:DESTABILIZED +1T:STUN",
    usage: {
        act: "%USER SWINGS AT %TARGET",
        crit: "%TARGET IS IRRADIATED",
        hit: "%TARGET IS HIT",
        miss: "%TARGET EVADES"
    },
    accuracy: 0.8,
    crit: 0.1,
    amt: 2,
    exec: function(user, target) {
         let amt = this.amt
		 let crit = this.crit
		 let acc = this.accuracy

        if(hasStatus(target, "destabilized")) {
            amt = this.amt + 2
			crit = this.crit + 0.3
			acc = this.accuracy + 0.1
        }
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'dull',
                rate: 1.0
            },
            critSfx: {
                name: 'dull',
                rate: 0.6
            },
			critStatus: {
				name: 'vulnerable',
				length: 2
			},
			hitExec: ()=>{
				if(hasStatus(target, "destabilized")) {
					addStatus({target, origin: user, status: "weakened", length: 2, noReact: true}); 
				}
			},
			critExec: ()=>{
				if(hasStatus(target, "destabilized")) {
					addStatus({target, origin: user, status: "stun", length: 1, noReact: true}); 
				}
			}
        })
    }
}

env.ACTIONS.dullflare_weak = {
    slug: "dullflare_weak",
    name: "Dull Salvo",
    type: 'special',
    desc: "'utilize dull pulse weapon';'leave targets open to greater attacks'",
    help: "FOES:: 50% -1HP, 15%C x2 + ONE OF (+2T:DESTABILIZED, +2T:VULNERABLE, +1T:WEAKENED)",
    anim: "basic-attack",
    accuracy: 0.5,
    crit: 0.15,
    amt: 1,
    usage: {
        act: "%USER FIRES RAPID DULL PULSES"
    },
    exec: function(user, target, beingUsedAsync) {
        let action = this
        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                let anim = env.ACTION_ANIMS.flare
                let baseDelay = ((env.ADVANCE_RATE * 0.066) * i)
                let animDelay = baseDelay + anim.duration;
                    
                setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                setTimeout(function(){
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'dull', rate: 2.0 },
                        critSfx: { name: 'shot6', rate: 1.25 },
                        critExec: ({target})=> {
							let rand = Math.random()
							if(rand < 0.3) {
								addStatus({target, origin: user, status: "destabilized", origin: user, length: 2}); 
								
							} else if(rand < 0.6) {
								addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 

							} else {
								addStatus({target, origin: user, status: "weakened", origin: user, length: 1}); 
							}
						}
                    })
                }, animDelay);
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.ik_attack_player = {
    slug: "ik_attack_player",
    name: "Veilksplitter",
    verb: "veilksplit",
    type: 'target',
    desc: "'dull-enabled cutting beam';'immense physical trauma'",
    anim: "basic-attack",
    help: "AUTOHIT -4HP +1T:STUN 5%C x2 +2T:STUN +3T:VULNERABLE +3T:PUNCTURE +3T:OPEN WOUND +3T:WEAKENED\nIF TARGET IS DESTABILIZED::AUTOHIT -8HP +1T:STUN 15%C x2 +2T:STUN +3T:VULNERABLE +3T:PUNCTURE +3T:OPEN WOUND +3T:WEAKENED",
    usage: {
        act: "%USER BLASTS %TARGET",
        crit: "%TARGET IS ANNIHILATED",
        hit: "%TARGET IS SEARED",
        miss: "%TARGET EVADES"
    },
    autohit: true,
    crit: 0.05,
    amt: 4,
    exec: function(user, target) {
        let amt = this.amt
		let crit = this.crit

        if(hasStatus(target, "destabilized")) {
            amt = this.amt + 4
			crit = this.crit + 0.1
        }
        removeStatus(user, "windup")
        return env.GENERIC_ACTIONS.singleTarget({
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'dull',
                rate: 0.5,
            },
            critSfx: {
                name: 'stab',
                rate: 0.4,
            },
            genExec: ({target}) => {
                addStatus({target, status: "stun", length: 1});
            },
            critExec: ({target}) => {
                addStatus({target, status: "stun", length: 2});
                addStatus({target, status: "vulnerable", length: 3});
                addStatus({target, status: "puncture", length: 3});
                addStatus({target, status: "open_wound", length: 3});
                addStatus({target, status: "weakened", length: 3});
            },
        })
    }
}

env.ACTIONS.dullflare_player = {
    slug: "dullflare_player",
    name: "Dull Flare",
    type: 'special',
    desc: "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
    help: "FOES::AUTOHIT -3HP 10%C x2 + ONE OF (+3T:VULNERABLE, +2T:OPEN WOUND, +1T:STUN)",
    anim: "basic-attack",
    autohit: true,
    crit: 0.1,
    amt: 3,
    usage: {
        act: "%USER TEARS OPEN THE DULL"
    },
    exec: function(user, target, beingUsedAsync) {
        removeStatus(user, "windup")
        let action = this
        env.GENERIC_ACTIONS.teamWave({
            team: user.enemyTeam,
            exec: (actor, i) => {
                let anim = env.ACTION_ANIMS.flare
                let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                let animDelay = baseDelay + anim.duration;
                    
                setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                setTimeout(function(){
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: 'dull', rate: 1.5 },
                        critSfx: { name: 'shot6', rate: 0.75 },
                        critExec: ({target})=> {
							let rand = Math.random()
							if(rand < 0.3) {
								addStatus({target, origin: user, status: "vulnerable", origin: user, length: 3}); 
								
							} else if(rand < 0.6) {
								addStatus({target, origin: user, status: "open_wound", origin: user, length: 2}); 

							} else {
								addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
							}
						}
                    })
                }, animDelay);
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    }
}

env.ACTIONS.special_player_dullsummon = {
    slug: "special_player_dullsummon",
    name: "Dull Portal",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere'",
    help: "SUMMON::2 DULL CONTAINER (MAX: 6 SUMMONS)",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER CONJURES CONTAINERS VIA THE DULL", target, 'none', 2000);
        play('dull', 0.8, 1);
        
		if(user.team.members.filter(m=>m.slug.includes('falsecritta')).length > 0) {
				{
				midCombatEnemyAdd('dull_container', 'left')
				midCombatEnemyAdd('dull_container', 'right')
			}

			setTimeout(()=>advanceTurn(user), 1000)
		}
		else
        //try to center the dude
        if(user.team.members.length == 8) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_container', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_container', 'right')
        } else {
            midCombatAllyAdd('player_dull_container', 'left')
            midCombatAllyAdd('player_dull_container', 'right')
        }

        setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_container')).length > 6) return "TOO MANY ALLIES" }
}

env.ACTIONS.special_player_dullbuff = {
    slug: "special_player_dullbuff",
    name: "Dull Overload",
    type: 'special',
    desc: "'destabilize allies via dull exposure';'attain direct control and focus attack'",
    help: "ALLIES::+1T:DESTABILIZED, +1T:FOCUSED",
    anim: "basic-attack",
    accuracy: 1,
    crit: 0,
    usage: {
        act: "%USER FLOODS THEIR ALLIES WITH DULL RADIATION"
    },
    exec: function(user, target, beingUsedAsync) {
        play('dull', 0.75, 1);
        env.GENERIC_ACTIONS.teamWave({
            team: user.team,
            exec: (actor, i) => {
                addStatus({target: actor, origin: user, status: "destabilized", length: 1, noReact: true}); 
                addStatus({target: actor, origin: user, status: "focused", length: 1, noReact: true}); 
            },
            advanceAfterExec: true, beingUsedAsync, user
        })
    },
    disableIf: (actor) => {
		if(actor.team.members.filter(m=>m.slug.includes('dull_')).length < 6) return "REQUIRES MORE ALLIES"
		if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" 
	}
}

env.ACTIONS.special_player_dullbuff_aug = {
    slug: "special_player_dullbuff_aug",
    name: "Dull Overload",
    type: 'special',
    desc: "'destabilize allies via dull exposure';'attain direct control and focus attack'",
    help: "ALLIES::+1T:DESTABILIZED, +1T:FOCUSED",
    anim: "basic-attack",
    accuracy: 1,
    crit: 0,
    usage: {
        act: "%USER FLOODS THEIR ALLIES WITH DULL RADIATION"
    },
    exec: function(user, target, beingUsedAsync) {
        play('dull', 0.75, 1);
        env.GENERIC_ACTIONS.teamWave({
            team: user.team,
            exec: (actor, i) => {
                addStatus({target: actor, origin: user, status: "destabilized", length: 1, noReact: true}); 
                addStatus({target: actor, origin: user, status: "focused", length: 1, noReact: true}); 
            },
            advanceAfterExec: true, beingUsedAsync, user,
        })
    },
    disableIf: (actor) => {
		if(actor.team.members.filter(m=>m.slug.includes('dull_')).length < 12) return "REQUIRES MORE ALLIES"
		if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" 
	}
}

env.ACTIONS.special_player_dullsummon_low = {
    slug: "special_player_dullsummon_low",
    name: "Dull Portal::LOW",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere';'expose self to dull radiation'",
    help: "SUMMON::4 DULL CONTAINERS (MAX: 12 SUMMONS)\nSELF::+2T:DESTABILIZED +1T:VULNERABLE",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER CONJURES A SWARM OF CONTAINERS VIA THE DULL", target, 'none', 2000);
        play('dull', 0.8, 1);
		addStatus({target: user, status: "destabilized", length: 2});
		addStatus({target: user, status: "vulnerable", length: 1});
        
        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_container', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_container', 'right')
        } else {
            midCombatAllyAdd('player_dull_container', 'left')
            midCombatAllyAdd('player_dull_container', 'left')
            midCombatAllyAdd('player_dull_container', 'right')
            midCombatAllyAdd('player_dull_container', 'right')
        }

        setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_')).length > 12) return "TOO MANY ALLIES" }
}

env.ACTIONS.special_player_dullsummon_medium = {
    slug: "special_player_dullsummon_medium",
    name: "Dull Portal::MEDIUM",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere';'expose self to dull radiation'",
    help: "SUMMON::2 COLLAPSE FOES AS WARPED ALLIES (MAX: 12 SUMMONS)\nSELF::+3T:DESTABILIZED +2T:VULNERABLE +1T:WEAKENED",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER CONJURES WARPED ALLIES VIA THE DULL", target, 'none', 2000);
        play('dull', 0.8, 1);
		addStatus({target: user, status: "destabilized", length: 3});
		addStatus({target: user, status: "vulnerable", length: 2});
		addStatus({target: user, status: "weakened", length: 1});

        let collapse_peasant = ['player_dull_container','player_dull_attendant','player_dull_veilklight','player_dull_attendant']
        let collapse_royal = ['player_dull_maintcloak','player_dull_maintcloak','player_dull_maintcloak','player_dull_archival_golem','player_dull_archival_golem']
        
        var newAllySlug = collapse_peasant.sample()
        var newAllySlug1 = collapse_royal.sample()

        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_attendant', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_attendant', 'right')
        } else {
            let rand = Math.random()
            if (rand < 0.75) {
                midCombatAllyAdd(newAllySlug,'left')
            } 
            else if (rand >= 0.25) {
                midCombatAllyAdd(newAllySlug1,'left')	
            }
            let rand1 = Math.random()
            if (rand1 < 0.75) {
                midCombatAllyAdd(newAllySlug,'right')
            } 
            else if (rand1 >= 0.25) {
                midCombatAllyAdd(newAllySlug1,'right')
            }
        }
        setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_')).length > 12) return "TOO MANY ALLIES" }
}

env.ACTIONS.special_player_dullsummon_high = {
    slug: "special_player_dullsummon_high",
    name: "Dull Portal::HIGH",
    type: 'special+summon+nomimic',
    desc: "'collect additional allies from elsewhere';'expose self to dull radiation'",
    help: "SUMMON::1 GOLEM MAINTANENCE FOE AS A WARPED ALLY (MAX: 12 SUMMONS)\nSELF::+4T:DESTABILIZED +3T:VULNERABLE +2T:WEAKENED +1T:OPEN WOUND",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        actionMessage(user, "%USER CONJURES A WARPED ALLY VIA THE DULL", target, 'none', 2000);
        play('dull', 0.8, 1);
		addStatus({target: user, status: "destabilized", length: 4});
		addStatus({target: user, status: "vulnerable", length: 3});
		addStatus({target: user, status: "weakened", length: 2});
		addStatus({target: user, status: "open_wound", length: 1});

        let golem_peasant = ['player_dull_basic_golem','player_dull_basic_golem','player_dull_husk','player_dull_surgeon_golem','player_dull_pressure_golem']
        let golem_royal = ['player_dull_surgeon_golem','player_dull_surgeon_golem','player_dull_surgeon_golem','player_dull_constructor_golem','player_dull_constructor_golem','player_dull_dullfriend']
        
        var newAllySlug = golem_peasant.sample()
        var newAllySlug1 = golem_royal.sample()

        //try to center the dude
        if(user.team.members.length == 14) {
            let uI = user.team.members.findIndex(a => a.slug == user.slug)
            if(uI < 3) midCombatAllyAdd('player_dull_husk', 'left')
            else if(uI >= 3) midCombatAllyAdd('player_dull_husk', 'right')
        } else {
            let rand2 = Math.random()
            if (rand2 > 0.5) 
            {
                let rand = Math.random()
                if (rand < 0.75) {
                    midCombatAllyAdd(newAllySlug,'left')
                } 
                else if (rand >= 0.25) {
                    midCombatAllyAdd(newAllySlug1,'left')	
                }
            }
            else
            {
                let rand1 = Math.random()
                if (rand1 < 0.75) {
                    midCombatAllyAdd(newAllySlug,'right')
                } 
                else if (rand1 >= 0.25) {
                    midCombatAllyAdd(newAllySlug1,'right')
                }
            }
        }
        setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_')).length > 12) return "TOO MANY ALLIES" }
}

env.ACTIONS.special_player_dullsummon_special = {
    slug: "special_player_dullsummon_special",
    name: "Dull Portal::SPECIAL",
    type: 'special+summon+nomimic',
    desc: "'attempt to collect great ally from elsewhere';'expose self to dull radiation on success'",
    help: "25% SUMMON::1 BOSS OR OTHERWISE SPECIAL FOE AS AN ALLY (MAX: 12 SUMMONS)\nSELF:: ON SUCCESS, +5T:DESTABILIZED +4T:VULNERABLE +3T:WEAKENED +2T:OPEN WOUND +1T:STUN\nNOTICE::UNAFFECTED BY FOCUSED",
    anim: "heal",
    accuracy: 1,
    crit: 0,
	itemAction: true, //we have to lie here so that imps can't use this action
    noRepeat: true,
    exec: function(user, target) {
        let chance = Math.random()
		let fated = user.statusEffects.find(status => status.slug == "fated_dull")
        if (chance < (0.75 - (fated ? fated.power * 0.05 : 0))) {
            actionMessage(user, "%USER CAN'T KEEP THE PORTAL OPEN", target, 'none', 2000);
            play('criticalError', 1.1, 1.3)
        } else {
            actionMessage(user, "%USER CONJURES A POWERFUL ALLY VIA THE DULL", target, 'none', 2000);
            play('dull', 0.6, 0.8);
			addStatus({target: user, status: "destabilized", length: 5});
			addStatus({target: user, status: "vulnerable", length: 4});
			addStatus({target: user, status: "weakened", length: 3});
			addStatus({target: user, status: "open_wound", length: 2});
			addStatus({target: user, status: "stun", length: 1});

            let collapse_divine = ['player_dull_movefriend','player_dull_movefriend','player_dull_movefriend','player_dull_bstrdshelf','player_dull_bstrdshelf','player_dull_bstrdshelf','player_dull_bstrdshelf','player_dull_gungolem','player_dull_gungolem']
            let golem_divine = ['player_dull_translation_core','player_dull_translation_core','player_dull_translation_core','player_dull_kivii','player_dull_kivii','player_dull_golemboss','player_dull_dullzika']
            let special_divine = ['player_dull_critta_pawn','player_dull_bstrdlight','player_dull_critta_pawn','player_dull_bstrdlight','player_dull_critta_pawn','player_dull_bstrdlight','player_dull_critta_knight','player_dull_bstrdlight','player_dull_critta_knight','player_dull_bstrdlight','player_dull_critta_knight','player_dull_bstrdlight','player_dull_critta_bishop','player_dull_bstrdlight','player_dull_critta_bishop','player_dull_bstrdlight','player_dull_critta_bishop','player_dull_bstrdlight','player_dull_critta_rook','player_dull_bstrdlight','player_dull_critta_rook','player_dull_bstrdlight','player_dull_critta_rook','player_dull_bstrdlight','player_dull_critta_queen','player_dull_critta_queen','player_dull_critta_king','player_dull_critta_king','player_dull_critta_dragon','player_dull_critta_unicorn','player_dull_critta_princess_defensive','player_dull_critta_princess_offensive','player_dull_critta_princess_hybrid','player_dull_critta_superknight','player_dull_critta_spawner']
            
            var newAllySlug = collapse_divine.sample()
            var newAllySlug1 = golem_divine.sample()
            var newAllySlug2 = special_divine.sample()

            //try to center the dude
            if(user.team.members.length == 14) {
                let uI = user.team.members.findIndex(a => a.slug == user.slug)
                if(uI < 3) midCombatAllyAdd('player_dull_bstrdshelf', 'left')
                else if(uI >= 3) midCombatAllyAdd('player_dull_bstrdshelf', 'right')
            } else {
                let rand = Math.random()
                if (rand > 0.5) {
                    let rand1 = Math.random()
                    if (rand1 < 0.5) {
                        midCombatAllyAdd(newAllySlug,'left')
                    } 
                    else if (rand1 < 0.8) {
                        midCombatAllyAdd(newAllySlug1,'left')	
                    }
                    else {
                        midCombatAllyAdd(newAllySlug2,'left')	
                    }
                }
                else {
                    let rand2 = Math.random()
                    if (rand2 < 0.5) {
                        midCombatAllyAdd(newAllySlug,'right')
                    } 
                    else if (rand2 < 0.8) {
                        midCombatAllyAdd(newAllySlug1,'right')
                    }
                    else {
                        midCombatAllyAdd(newAllySlug2,'right')
                    }
                }
            }
        }
            setTimeout(()=>advanceTurn(user), 1000)
    },
    disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_')).length > 12) return "TOO MANY ALLIES" }
}

env.ACTIONS.dullsummon_failure = {
    slug: "dullsummon_failure",
    name: "Nothing",
    type: 'autohit',
    desc: "'just nothing'",
    anim: "heal",
    help: "NOTHING",
    usage: {
        act: "%USER CAN'T HOLD THE PORTAL OPEN"
    },
    exec: function(user, target) {
        play('criticalError', 1)
        return 'nothing';
    }
}

	env.ACTIONS.special_dullsummon_select = {
        slug: "special_dullsummon_select",
        name: "Dull Contrivance",
        type: 'special+summon+nomimic',
        desc: "'select range of allies to collect';'offer user responsive choice'",
        anim: "wobble",
		itemAction: true,
        help: "CHOOSE:: DULL PORTAL::LOW ::OR:: DULL PORTAL::MEDIUM ::OR:: DULL PORTAL::HIGH ::OR:: DULL PORTAL::SPECIAL",
        usage: {
            act: "%USER CONSIDERS THEIR OPTIONS"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
            let action = this

            //summon a div that lets the player click guaranteed or chance <--- we are modifying this to let the player choose between dull portal actions
            actionChoice({
                user: user,
                action: action,
                choiceText: `${user.name} considers their options...`,
                options: [
                    {text: "Dull Portal::LOW", definition: "NOTE::'SUMMON::4 DULL CONTAINERS (MAX: 12 SUMMONS)'\nSELF::'+2T:DESTABILIZED +1T:VULNERABLE'"},
                    {text: "Dull Portal::MEDIUM", definition: "NOTE::'SUMMON::2 COLLAPSE FOES AS WARPED ALLIES (MAX: 12 SUMMONS)'\nSELF::'+3T:DESTABILIZED +2T:VULNERABLE +1T:WEAKENED'"},
					{text: "Dull Portal::HIGH", definition: "NOTE::'SUMMON::1 GOLEM MAINTANENCE FOE AS A WARPED ALLY (MAX: 12 SUMMONS)'\nSELF::'+4T:DESTABILIZED +3T:VULNERABLE +2T:WEAKENED +1T:OPEN WOUND'"},
					{text: "Dull Portal::SPECIAL", definition: "NOTE::'25% SUMMON::1 BOSS OR OTHERWISE SPECIAL FOE AS AN ALLY (MAX: 12 SUMMONS)'\nSELF::'ON SUCCESS, +5T:DESTABILIZED +4T:VULNERABLE +3T:WEAKENED +2T:OPEN WOUND +1T:STUN'\nNOTICE::UNAFFECTED BY FOCUSED"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                        
                    var hit //note to self::make c0-c3 use the useAction function to use corresponding dull portal actions <--- why did i say use so many times.....
                    switch(c) {
                        case "c0":
                            hit = useAction(user, env.ACTIONS['special_player_dullsummon_low'], user, {beingUsedAsync: true, reason: "contrivance"})
                            break;
                        case "c1":
                            hit = useAction(user, env.ACTIONS['special_player_dullsummon_medium'], user, {beingUsedAsync: true, reason: "contrivance"})
                            break
						case "c2":
                            hit = useAction(user, env.ACTIONS['special_player_dullsummon_high'], user, {beingUsedAsync: true, reason: "contrivance"})
                            break
						case "c3":
                            hit = useAction(user, env.ACTIONS['special_player_dullsummon_special'], user, {beingUsedAsync: true, reason: "contrivance"})
                            break
                    }

                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        },
		disableIf: (actor) => {if(actor.team.members.filter(m=>m.slug.includes('dull_')).length > 12) return "TOO MANY ALLIES" }
    },

// spirestone actions
	// spirestone utility default
    env.ACTIONS.evade_empowered = {
        slug: "evade_empowered",
        name: "Juke",
        type: 'autohit',
        desc: "'strategic sidestep';'hide vulnerability';'useful against armored foes'",
        anim: "",
        help: "+1T:EVASION +1T:EMPOWERED -VULNERABLE -WEAKENED",
        usage: {
            act: "%USER CREATES AN OPENING"
        },
        
        exec: function(user, target) {
            play('mend', 0.4);
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            addStatus({target: user, status: "empowered", length: 1, noReact: true}); 
            return 'nothing';
        },

        avoidChaining: true
    },

	// spirestone primary augment
    env.ACTIONS.haymaker = {
        slug: "haymaker",
        name: "Overclocked Strike",
        type: 'target',
        desc: "'deadly attack upon one target';'damage and stun immensely improved by FOCUSED'",
        anim: "basic-attack",
        help: "100% -3HP + (XT:FOCUSED), 40%C -3HP +(XT:FOCUSED) +1T:STUN + (XT:FOCUSED / 2), SELF::-FOCUSED",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 3,
        exec: function(user, target) {
			let power = Math.floor(hasStatus(user, 'focused') )
            removeStatus(user, "windup")
			setTimeout(()=>{
				removeStatus(user, "focused")
				},
				env.ADVANCE_RATE * 0.2)
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.8
                },
                critStatus: {
                    name: 'stun',
                    length: 1 + Math.floor(power / 2)
                },
				hitExec: ({target}) => {
					combatHit(target, {amt: (power), origin: user, autohit: true})
				},
				critExec: ({target}) => {
					combatHit(target, {amt: (power), origin: user, autohit: true})
				}
            })
        }
	},

    env.ACTIONS.spirestone_focused = {
        slug: "spirestone_focused",
        name: "Extra Preparation",
        type: 'autohit',
        desc: "'hold prepared attack';'progressively increase power'",
        anim: "",
        help: "+WINDUP +2T:FOCUSED -WEAKENED",
        usage: {
            act: "%USER WAITS FOR THE RIGHT MOMENT..."
        },
		disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        avoidChaining: true,
        exec: function(user, target) {
            play('talklaugh', 0.5);
            addStatus({target: user, status: "windup", length: 1}); 
            addStatus({target: user, status: "focused", length: 2, noReact: true});
            return 'nothing';
        }
    },

	// spirestone secondary augment
    env.ACTIONS.special_hardening_barrier = {
        slug: "special_hardening_barrier",
        name: "Hardening Cover",
        type: 'special',
        desc: "'apply ablative protection';'upgrades protection to passively increase accuracy'",
        help: "ALLIES::+1 BP +HARDENED",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 1,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },
        exec: function(user, target, beingUsedAsync) {
			let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'guard',
                            rate: 2
                        },
                        hitStatus: {
                            name: 'hardened',
                            length: 1
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },

	// spirestone utility augment
    env.ACTIONS.team_huddle = {
        slug: "team_huddle",
        name: "Team Huddle",
        type: 'self+autohit+support',
        desc: "'back off';'empower entire team'",
        anim: "",
        help: "+1T:EVASION, ALLIES::+2T:EMPOWERED",
        usage: {
            act: "%USER CALLS OUT DIRECTIONS"
        },
        autohit: true,
        exec: function(user, target) {
            play("talkchoir7", 2)

            addStatus({target: user, origin: user, status: "evasion", origin: user, length: 1}); 

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "empowered", origin: user, length: 2, noReact: true}); 
                    play('mend', 0.4);
                }
            })

            return 'nothing'
        }
    },

	// hands actions
		//hands primary
    env.ACTIONS.ceremonial_weapon = {
        slug: "ceremonial_weapon",
        name: "Corikuva",
        verb: "swing at",
        type: 'target',
        desc: "'utilize ceremonial weaponry';'purported to curse foes'",
        anim: "basic-attack",
        help: "80% -1HP + ONE OF (+3T:PUNCTURE, +2T:CURSED, +2T:VULNERABLE), 20%C x2 + ONE OF (+3T:PUNCTURE, +2T:CURSED, +2T:VULNERABLE, +1T:STUN)",
        usage: {
            act: "%USER SWINGS AT %TARGET",
            crit: "A FRIGHTENING BLOW",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.8,
        crit: 0.2,
        amt: 1,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'destabilize',
                    rate: 2
                },

                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "puncture", origin: user, length: 3}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 

                    } else {
                        addStatus({target, origin: user, status: "cursed", origin: user, length: 2}); 
                    }
                },
				critExec: ({target})=> {
                    let rand1 = Math.random()
                    if(rand1 < 0.25) {
                        addStatus({target, origin: user, status: "puncture", origin: user, length: 3}); 
                        
                    } else if(rand1 < 0.5) {
                        addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 

                    } else if(rand1 < 0.75) {
                        addStatus({target, origin: user, status: "cursed", origin: user, length: 2}); 
                    } else {
						
						addStatus({target, origin: user, status: "stun", origin: user, length: 1}); 
					}
                }
            })
        }
    },
		//hands secondary
    env.ACTIONS.prayer = {
        slug: "prayer",
        name: "Prayer",
        type: 'support+target+self+autohit',
        desc: "'make plea to chosen deity';'many beneficial outcomes'",
        help: "AUTOHIT ONE OF (+3HP +3T:REGEN, +2T:EVASION +SURGE, +2T:FOCUSED +1T:EMPOWERED, +3T:FAVORED) 10%C CHOOSE ANOTHER RANDOM EFFECT",
        anim: "heal",
		disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        usage: {
            act: "%USER PRAYS FOR %TARGET",
            crit: "%TARGET FEELS WAY BETTER",
            hit: "%TARGET FEELS BETTER",
            miss: "%TARGET IS A HERETIC"
        },
        crit: 0.1,
        autohit: true,
        beneficial: true,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
				hitSfx: {
					name: "mend",
					rate: 0.75
				},
                hitExec: ({target})=> {
                    let rand = Math.random()
                    if(rand < 0.25) {

                        addStatus({target, origin: user, status: "regen", origin: user, length: 3}); 
                        combatHit(target, {amt: -3, origin: user, autohit: true, beneficial: true});
                    } else if(rand < 0.5) {

                        addStatus({target, origin: user, status: "evasion", origin: user, length: 2}); 
						addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 
                    } else if(rand < 0.75) {

                        addStatus({target, origin: user, status: "focused", origin: user, length: 2});
						addStatus({target, origin: user, status: "empowered", origin: user, length: 1});
                    } else {

						addStatus({target, origin: user, status: "favored", origin: user, length: 3}); 
					}
                },
				critExec: ({target})=> {
                    let rand1 = Math.random()
                    if(rand1 < 0.25) {

                        addStatus({target, origin: user, status: "regen", origin: user, length: 3}); 
                        combatHit(target, {amt: -3, origin: user, autohit: true, beneficial: true});
                    } else if(rand1 < 0.5) {

                        addStatus({target, origin: user, status: "evasion", origin: user, length: 2}); 
						addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 
                    } else if(rand1 < 0.75) {

                        addStatus({target, origin: user, status: "focused", origin: user, length: 2});
						addStatus({target, origin: user, status: "empowered", origin: user, length: 1});
                    } else {

						addStatus({target, origin: user, status: "favored", origin: user, length: 3}); 
					}
                },
            })
        },

        avoidChaining: true,
        disableIf: (actor) => {
            return (
                actor.team.name == "enemy" &&
                !actor.team.members.some(member => ((member != actor) && (member.state != "dead") ))
            )
        }
    },
		//hands utility
    env.ACTIONS.special_prophesize = {
        slug: "special_prophesize",
        name: "Prophesize",
        type: 'special',
        desc: "'receive prophetic visions to bless allies';'incite divine intervention against foes'",
        help: "ALLIES:: ONE OF (+3T:REGEN, +2T:EVASION, +3T:FAVORED, +1T:FOCUSED), FOES:: ONE OF (+3T:PUNCTURE, +2T:VULNERABLE, +3T:CURSED, +2T:FEAR)",
        anim: "heal",
		disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        autohit: true,
        usage: {
            act: "%USER SEES THE FUTURE"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let allyTeam = user.team.name
            let enemyTeam = user.enemyTeam.name

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                advanceAfterExec: true, beingUsedAsync, user,
                exec: (actor) => {
                    if(actor.slug == user.slug) return;

                    switch(actor.team.name) {
                        case allyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                beneficial: true,
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkchoir",
									rate: 0.75
								},
                                hitExec: ()=> {
										let rand = Math.random()
										if(rand < 0.25) {

											addStatus({target: actor, origin: user, status: "regen", length: 3}); 
										} else if(rand < 0.5) {

											addStatus({target: actor, origin: user, status: "evasion", length: 2}); 
										} else if(rand < 0.75) {

											addStatus({target: actor, origin: user, status: "favored", length: 3}); 
										} else {
											
											addStatus({target: actor, origin: user, status: "focused", length: 1});
										}
									}
                            })
                        break

                        case enemyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkfairy",
									rate: 0.75
								},
                                hitExec: ()=> {
										let rand1 = Math.random()
										if(rand1 < 0.25) {

											addStatus({target: actor, origin: user, status: "puncture", origin: user, length: 3}); 
										} else if(rand1 < 0.5) {

											addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 2}); 
										} else if(rand1 < 0.75) {

											addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 3}); 
										} else {
											
											addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2});
										}
									}
                            })                            
                        break
                    }
                }
            })
        }
    },
		//hands primary augment
    env.ACTIONS.ceremonial_judgement = {
        slug: "ceremonial_judgement",
        name: "Kuvakivii",
        type: 'target',
        desc: "'utilize enchanted weaponry';'cast judgement on foes'",
        anim: "basic-attack",
        help: "80% -2HP, 10%C x2 + (FOES:: + ONE OF (+3T:PUNCTURE, +3T:CURSED, +3T:VULNERABLE)",
        usage: {
            act: "%USER SWINGS %TARGET",
            crit: "%TARGET'S TEAM FEELS JUDGED",
            hit: "%TARGET IS BLUDGEONED",
            miss: "%TARGET DODGES"
        },
        accuracy: 0.8,
        crit: 0.1,
        amt: 2,
        exec: function(user, target) {

            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'destabilize',
                    rate: 1.5
                },

                critExec: ()=> env.GENERIC_ACTIONS.teamWave({
                    team: user.enemyTeam,
                    exec: (actor, i)=> {
						let rand = Math.random()
						if(rand < 0.3) {
							addStatus({target: actor, origin: user, status: "puncture", origin: user, length: 3}); 
							console.log('applying puncture')
							play('stab', 0.5)
						} else if(rand < 0.6) {
							console.log('applying vulnerable')
							addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 3}); 
							play('status', 1)
						} else {
							console.log('applying cursed')
							addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 3}); 
							play('talkfairy', 0.5)
						}
					}
                })
            })
        }
    },
		//hands secondary augment
    env.ACTIONS.special_prayer_allies = {
        slug: "special_prayer_allies",
        name: "Ritual",
        type: 'special',
        desc: "'perform ritual to bless allies';'many beneficial outcomes'",
        help: "ALLIES:: AUTOHIT ONE OF (+2HP -PUNCTURE, +SURGE, +1T:FOCUSED, +2T:FAVORED), 10%C CHOOSE ANOTHER RANDOM EFFECT",
        anim: "heal",
        autohit: true,
        crit: 0.1,
		beneficial: true,
		disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        usage: {
            act: "%USER PRAYS FOR THEIR TEAM"
        },
        exec: function(user, target, beingUsedAsync) {
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
					env.GENERIC_ACTIONS.singleTarget({
						user: user,
						target: actor,
						action: this,
						beneficial: true,
						hitSfx: {
							name: 'mend',
							rate: 0.75
						},
						critSfx: {
							name: 'mend',
							rate: 0.5
						},
						hitExec: ({target})=> {
							let rand = Math.random()
							if(rand < 0.25) {
								removeStatus(target, "puncture")
								combatHit(target, {amt: -2, origin: user, autohit: true, beneficial: true});
							} else if(rand < 0.5) {

								addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 
							} else if(rand < 0.75) {

								addStatus({target, origin: user, status: "focused", origin: user, length: 1});
							} else {

								addStatus({target, origin: user, status: "favored", origin: user, length: 2}); 
							}
						},
						critExec: ({target})=> {
							let rand1 = Math.random()
							if(rand1 < 0.25) {
								removeStatus(target, "puncture")
								combatHit(target, {amt: -2, origin: user, autohit: true, beneficial: true});
							} else if(rand1 < 0.5) {

								addStatus({target, origin: user, status: "surge", origin: user, length: 1}); 
							} else if(rand1 < 0.75) {

								addStatus({target, origin: user, status: "focused", origin: user, length: 1});
							} else {

								addStatus({target, origin: user, status: "favored", origin: user, length: 2}); 
							}
						}
					})
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	//oh god here we go
	//major arcana actions start here
	env.ACTIONS.tarot_thefool = {
        slug: "tarot_thefool",
        name: "TAROT:: The Fool",
        type: 'autohit',
        desc: "'SORRY NOTHING'",
        anim: "",
        help: "NO EFFECT",
        usage: {
            act: "%USER DRAWS THE FOOL"
        },
        exec: function(user, target, beingUsedAsync) {
            advanceTurn(user)
        }
    },
	
	env.ACTIONS.tarot_thefool_reversed = {
        slug: "tarot_thefool_reversed",
        name: "TAROT:: The Fool, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::AUTOHIT +3T:VULNERABLE +SURGE +CRITICAL FLAW",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS THE FOOL, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "vulnerable", length: 3});
							addStatus({target: actor, origin: user, status: "critical_flaw", length: 1});
							addStatus({target: actor, origin: user, status: "surge", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_themagician = { //beneficial card
		slug: "tarot_themagician",
		name: "TAROT:: The Magician",
		type: 'special+summon+nomimic',
		desc: "'collect additional allies from elsewhere'",
		help: "SUMMON::4 IDEAS (MAX: 12 SUMMONS)\nALLIES::+2T:EMPOWERED",
		anim: "heal",
		accuracy: 1,
		crit: 0,
		itemAction: true, //we have to lie here so that imps can't use this action
		noRepeat: true,
		exec: function(user, target, beingUsedAsync) {
			actionMessage(user, "%USER DRAWS THE MAGICIAN", target, 'none', 2000);
			play('dull', 0.8, 1);
			
			//try to center the dude
			if(user.team.members.length == 14) {
				let uI = user.team.members.findIndex(a => a.slug == user.slug)
				if(uI < 3) midCombatAllyAdd('player_critta_spawner_bee', 'left')
				else if(uI >= 3) midCombatAllyAdd('player_critta_spawner_bee', 'right')
			} else {
				midCombatAllyAdd('player_critta_spawner_bee', 'left')
				midCombatAllyAdd('player_critta_spawner_bee', 'left')
				midCombatAllyAdd('player_critta_spawner_bee', 'right')
				midCombatAllyAdd('player_critta_spawner_bee', 'right')
			}
			setTimeout(()=>{             
				env.GENERIC_ACTIONS.teamWave({
						team: user.team,
						exec: (actor, i)=>{
							addStatus({target: actor, origin: user, status: "empowered", origin: user, length: 2, noReact: true}); 
							play('mend', 0.5);
						}
					})
				}, env.ADVANCE_RATE * 0.5)
			setTimeout(()=>advanceTurn(user), 1000)
		},
		disableIf: (actor) => {if(actor.team.members.length > 15) return "TOO MANY ALLIES" }
	}
	
	env.ACTIONS.tarot_themagician_noadvance = { //beneficial card
		slug: "tarot_themagician_noadvance",
		name: "TAROT:: The Magician",
		type: 'special+summon+nomimic',
		desc: "'collect additional allies from elsewhere'",
		help: "SUMMON::4 IDEAS (MAX: 12 SUMMONS)\nALLIES::+2T:EMPOWERED",
		anim: "heal",
		accuracy: 1,
		crit: 0,
		itemAction: true, //we have to lie here so that imps can't use this action
		noRepeat: true,
		exec: function(user, target, beingUsedAsync) {
			actionMessage(user, "%USER DRAWS THE MAGICIAN", target, 'none', 2000);
			play('dull', 0.8, 1);
			
			//try to center the dude
			if(user.team.members.length == 14) {
				let uI = user.team.members.findIndex(a => a.slug == user.slug)
				if(uI < 3) midCombatAllyAdd('player_critta_spawner_bee', 'left')
				else if(uI >= 3) midCombatAllyAdd('player_critta_spawner_bee', 'right')
			} else {
				midCombatAllyAdd('player_critta_spawner_bee', 'left')
				midCombatAllyAdd('player_critta_spawner_bee', 'left')
				midCombatAllyAdd('player_critta_spawner_bee', 'right')
				midCombatAllyAdd('player_critta_spawner_bee', 'right')
			}
			setTimeout(()=>{             
				env.GENERIC_ACTIONS.teamWave({
						team: user.team,
						exec: (actor, i)=>{
							addStatus({target: actor, origin: user, status: "empowered", origin: user, length: 2, noReact: true}); 
							play('mend', 0.5);
						}
					})
				}, env.ADVANCE_RATE * 0.5)
		},
		disableIf: (actor) => {if(actor.team.members.length > 15) return "TOO MANY ALLIES" }
	}
	
	env.ACTIONS.tarot_themagician_reversed = {
        slug: "tarot_themagician_reversed",
        name: "TAROT:: The Magician, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::AUTOHIT +3T:WEAKENED, +3T:FEAR, +MADNESS",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS THE MAGICIAN, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'fear',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "weakened", length: 3});
							addStatus({target: actor, origin: user, status: "fear", length: 3});
							addStatus({target: actor, origin: user, status: "madness", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thehighpriestess = { //beneficial card
        slug: "tarot_thehighpriestess",
        name: "TAROT:: The High Priestess",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::+4T:FOCUSED, +3T:EVASION",
        usage: {
            act: "%USER DRAWS THE HIGH PRIESTESS"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 2)

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 4, noReact: true});
                    addStatus({target: actor, origin: user, status: "evasion", origin: user, length: 3, noReact: true}); 					
                    play('mend', 0.5);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_thehighpriestess_reversed = { //beneficial card
        slug: "tarot_thehighpriestess_reversed",
        name: "TAROT:: The High Priestess, Reversed",
        type: 'autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "FOES::+4T:FEAR, +4T:CURSED",
        usage: {
            act: "%USER DRAWS THE HIGH PRIESTESS, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 2)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 4, noReact: true});
                    addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 4, noReact: true}); 					
                    play('status', 0.5);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_theempress = { //beneficial card
        slug: "tarot_theempress",
        name: "TAROT:: The Empress",
        type: 'special',
        desc: "'project broad reparative applicators';'restore allies to fighting condition'",
        help: "ALLIES::AUTOHIT +4HP +4T:REGEN -PUNCTURE -DOWN",
        anim: "heal",
        autohit: true,
        amt: -4,
        usage: {
            act: "%USER DRAWS THE EMPRESS"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        //beneficial: true,
                        action, 
                        user, 
                        target: actor,
                        hitStatus: {name: 'regen', length: 4},
                        hitSfx: {
                            name: 'mend',
                            rate: 1
                        },
                        genExec: ()=>{
                            if(actor.state == "dead") {
                                actor.hp = 3
                                combatRevive(actor)
                                reactDialogue(actor, 'receive_rez')
                                addStatus({target: actor, origin: user, status: "evasion", length: 2, noReact: true}); 
                            }
                        }                
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_theempress_reversed = { //beneficial card
        slug: "tarot_theempress_reversed",
        name: "TAROT:: The Empress, Reversed",
        type: 'special',
        desc: "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        help: "FOES::100% -3HP +4T:PUNCTURE, 20%C x2 +4T:PUNCTURE",
        anim: "basic-attack",
        accuracy: 1,
        crit: 0.2,
        amt: 3,
        usage: {
            act: "%USER DRAWS THE EMPRESS, REVERSED"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.shoot
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot6', rate: 0.75 },
                            critSfx: { name: 'stab', rate: 0.5 },
							hitStatus: { name: 'puncture', length: 4 },
							critStatus: { name: 'puncture', length: 4 }
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_theemperor = { //beneficial card
        slug: "tarot_theemperor",
        name: "TAROT:: The Emperor",
        type: 'special',
        desc: "'apply ablative protection';'upgrades protection to passively increase accuracy'",
        help: "ALLIES::+5 BP +HARDENED +REPAIRS +1T:FOCUSED",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 5,
        usage: {
            act: "%USER DRAWS THE EMPEROR"
        },
        exec: function(user, target, beingUsedAsync) {
			let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'guard',
                            rate: 0.5
                        },
						hitExec: ({target})=> {
							addStatus({target, origin: user, status: "hardened", length: 1, noReact: true})
							addStatus({target, origin: user, status: "repairs", length: 1, noReact: true})
							addStatus({target, origin: user, status: "focused", length: 1, noReact: true})
						},
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_theemperor_reversed = { //beneficial card
        slug: "tarot_theemperor_reversed",
        name: "TAROT:: The Emperor, Reversed",
        type: 'special',
        desc: "'apply ablative protection';'upgrades protection to passively increase accuracy'",
        help: "FOES::+10 BP +MILLION TEETH +FRACTALLINE",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 10,
        usage: {
            act: "%USER DRAWS THE EMPEROR, REVERSED"
        },
        exec: function(user, target, beingUsedAsync) {
			let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 2
                        },
						hitExec: ({target})=> {
							addStatus({target, origin: user, status: "million_teeth", length: 1, noReact: true})
							addStatus({target, origin: user, status: "fractalline", length: 1, noReact: true})
						},
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thehierophant = { //beneficial card
        slug: "tarot_thehierophant",
        name: "TAROT:: The Hierophant",
        type: 'special',
        desc: "'reveal a terrible truth';'mark self for death';'randomly affect enemy team'",
        anim: "",
        help: "ALLIES::FULLY RESTORE HP",
        usage: {
            act: "%USER DRAWS THE HIEROPHANT"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                        play('talkflower', 1)
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "REST",
                            size: 2
                        })
                        
                        actor.hp = actor.maxhp

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "player_conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                },
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
			advanceTurn(user)
        }
    },
	
	env.ACTIONS.tarot_thehierophant_noadvance = { //beneficial card
        slug: "tarot_thehierophant_noadvance",
        name: "TAROT:: The Hierophant",
        type: 'special',
        desc: "'reveal a terrible truth';'mark self for death';'randomly affect enemy team'",
        anim: "",
        help: "ALLIES::FULLY RESTORE HP",
        usage: {
            act: "%USER DRAWS THE HIEROPHANT"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                        play('talkflower', 1)
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "REST",
                            size: 2
                        })
                        
                        actor.hp = actor.maxhp

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "player_conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                },
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },
	
	env.ACTIONS.tarot_thehierophant_reversed = {
        slug: "tarot_thehierophant_reversed",
        name: "TAROT:: The Hierophant, Reversed",
        type: 'special',
        desc: "'grasp the nature of this place';'recognize and exploit framing device'",
        anim: "wobble",
        help: "ALL::STATUS INVERSION",
        usage: {
            act: "%USER DRAWS THE HIEROPHANT, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 1.5)
            let action = this
            
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            invertStatuses(actor)
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thelovers = {
        slug: "tarot_thelovers",
        name: "TAROT:: The Lovers",
        type: 'special+nomimic',
        desc: "'impart horrific knowledge';'afflict foes with fear and madness';'misdirect attacks of foes'",
        anim: "",
        help: "FOES::+CONJOINED",
        usage: {
            act: "%USER DRAWS THE LOVERS"
        },
        autohit: true,
		itemAction: true, //we have to lie here so that imps can't use this action
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.35)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "conjoined", length: 1}); 
                },
                
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },
	
	env.ACTIONS.tarot_thelovers_reversed = {
        slug: "tarot_thelovers_reversed",
        name: "TAROT:: The Lovers, Reversed",
        type: 'special',
        desc: "'receive prophetic visions to bless allies';'incite divine intervention against foes'",
        help: "ALLIES:: +2T:VULNERABLE, +1T:STUN, FOES:: +1T:FOCUSED +SURGE",
        anim: "",
        autohit: true,
        usage: {
            act: "%USER DRAWS THE LOVERS, REVERSED"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let allyTeam = user.team.name
            let enemyTeam = user.enemyTeam.name

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                advanceAfterExec: true, beingUsedAsync, user,
                exec: (actor) => {

                    switch(actor.team.name) {
                        case allyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                beneficial: true,
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkfairy",
									rate: 0.5
								},
                                hitExec: ()=> {
										addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 2});
										addStatus({target: actor, origin: user, status: "stun", origin: user, length: 1});
									}
                            })
                        break

                        case enemyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkchoir7",
									rate: 2
								},
                                hitExec: ()=> {
										addStatus({target: actor, origin: user, status: "focused", origin: user, length: 1});
										addStatus({target: actor, origin: user, status: "surge", origin: user, length: 1});
									}
                            })                            
                        break
                    }
                }
            })
        }
    },
	
	env.ACTIONS.tarot_thechariot = { //beneficial card
        slug: "tarot_thechariot",
        name: "TAROT:: The Chariot",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::+4T:FOCUSED, +4T:EMPOWERED",
        usage: {
            act: "%USER DRAWS THE CHARIOT"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 2)


            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 4, noReact: true}); 
					addStatus({target: actor, origin: user, status: "empowered", origin: user, length: 4, noReact: true}); 
                    play('mend', 0.5);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_thechariot_reversed = {
        slug: "tarot_thechariot_reversed",
        name: "TAROT:: The Chariot, Reversed",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::2T:FEAR, +MADNESS, +WILD SURGE",
        usage: {
            act: "%USER DRAWS THE CHARIOT, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 2)


            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 2, noReact: true}); 
					addStatus({target: actor, origin: user, status: "madness", origin: user, length: 1, noReact: true}); 
					addStatus({target: actor, origin: user, status: "wild_surge", origin: user, length: 1, noReact: true}); 
                    play('fear', 0.5);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_strength = { //beneficial card
        slug: "tarot_strength",
        name: "TAROT:: Strength",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::+5T:FOCUSED +INFALLIBLE",
        usage: {
            act: "%USER DRAWS STRENGTH"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 2)


            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 5, noReact: true}); 
					addStatus({target: actor, origin: user, status: "infallible", origin: user, length: 1, noReact: true}); 
                    play('talkchoir', 0.5);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_strength_reversed = { //beneficial card
        slug: "tarot_strength_reversed",
        name: "TAROT:: Strength, Reversed",
        type: 'special',
        desc: "'impart horrific knowledge';'afflict foes with fear and madness';'misdirect attacks of foes'",
        anim: "",
        help: "FOES::+3T:FEAR +MADNESS SPECIAL::100% REDUCE FOE HP BY 75%",
        usage: {
            act: "%USER DRAWS STRENGTH, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.25)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", length: 3}); 
                    addStatus({target: actor, origin: user, status: "madness", length: 1});
                        
					sendFloater({
						target: actor,
						type: "arbitrary",
						specialClass: "fate",
						arbitraryString: "REPENT",
						size: 2
					})
					
					actor.hp = Math.floor(actor.hp * 0.25)

					//special handling for weird hp usage
					let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
					if(conjoin) conjoin.events.onCombatHit();
					updateStats({actor})
					
					advanceAfterExec: true,
					beingUsedAsync,
					user
					endCallback: ()=>{console.log('just called advance')}
					advanceTurn(user)
				}
            })
        }
    },
	
	env.ACTIONS.tarot_strength_reversed_noadvance = { //beneficial card
        slug: "tarot_strength_reversed_noadvance",
        name: "TAROT:: Strength, Reversed",
        type: 'special',
        desc: "'impart horrific knowledge';'afflict foes with fear and madness';'misdirect attacks of foes'",
        anim: "",
        help: "FOES::+3T:FEAR +MADNESS SPECIAL::100% REDUCE FOE HP BY 75%",
        usage: {
            act: "%USER DRAWS STRENGTH, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.25)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", length: 3}); 
                    addStatus({target: actor, origin: user, status: "madness", length: 1});
                        
					sendFloater({
						target: actor,
						type: "arbitrary",
						specialClass: "fate",
						arbitraryString: "REPENT",
						size: 2
					})
					
					actor.hp = Math.floor(actor.hp * 0.25)

					//special handling for weird hp usage
					let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
					if(conjoin) conjoin.events.onCombatHit();
					updateStats({actor})
					
					advanceAfterExec: true,
					beingUsedAsync,
					user
					endCallback: ()=>{console.log('just called advance')}
				}
            })
        }
    },
	
	env.ACTIONS.tarot_thehermit = { //beneficial card
        slug: "tarot_thehermit",
        name: "TAROT:: The Hermit",
        type: 'autohit',
        desc: "'hide vulnerability';'look for opportunity';'useful against wily foes'",
        anim: "",
        help: "SELF::+SURGE +4T:FOCUSED +4T:EVASION +4T:EMPOWERED +4T:CARAPACE +4T:SPIKES +4T:REGEN +4T:FAVORED",
        usage: {
            act: "%USER DRAWS THE HERMIT"
        },
        
        exec: function(user, target, beingUsedAsync) {
            play('talkchoir', 0.5);
				addStatus({target: user, origin: user, status: "surge", length: 1})
                addStatus({target: user, origin: user, status: "focused", length: 4})
                addStatus({target: user, origin: user, status: "evasion", length: 4})
                addStatus({target: user, origin: user, status: "empowered", length: 4})
                addStatus({target: user, origin: user, status: "carapace", length: 4})
                addStatus({target: user, origin: user, status: "spikes", length: 4})
				addStatus({target: user, origin: user, status: "regen", length: 4})
				addStatus({target: user, origin: user, status: "favored", length: 4})
				advanceTurn(user)
            return 'nothing';
        },
        avoidChaining: true
    },
	
	env.ACTIONS.tarot_thehermit_reversed = {
        slug: "tarot_thehermit_reversed",
        name: "TAROT:: The Hermit, Reversed",
        type: 'autohit',
        desc: "'hide vulnerability';'look for opportunity';'useful against wily foes'",
        anim: "",
        help: "SELF::+2T:STUN +4T:FEAR +4T:VULNERABLE +CRITICAL FLAW +4T:WEAKENED +4T:OPEN WOUND +4T:SIPHON +4T:PUNCTURE +4T:CURSED",
        usage: {
            act: "%USER DRAWS THE HERMIT, REVERSED"
        },
        
        exec: function(user, target, beingUsedAsync) {
            play('fairy', 0.25);
				addStatus({target: user, origin: user, status: "stun", length: 2})
                addStatus({target: user, origin: user, status: "fear", length: 4})
                addStatus({target: user, origin: user, status: "vulnerable", length: 4})
				addStatus({target: user, origin: user, status: "critical_flaw", length: 1})
                addStatus({target: user, origin: user, status: "weakened", length: 4})
                addStatus({target: user, origin: user, status: "open_wound", length: 4})
                addStatus({target: user, origin: user, status: "siphon", length: 4})
				addStatus({target: user, origin: user, status: "puncture", length: 4})
				addStatus({target: user, origin: user, status: "cursed", length: 4})
				advanceTurn(user)
            return 'nothing';
        },
        avoidChaining: true
    },
	
	env.ACTIONS.tarot_thewheeloffortune = { //beneficial card
        slug: "tarot_thewheeloffortune",
        name: "TAROT:: The Wheel Of Fortune",
        type: 'special',
        desc: "'receive prophetic visions to bless allies';'incite divine intervention against foes'",
        help: "ALLIES:: ONE OF (+4T:REGEN +3HP, +4T:EVASION +SURGE, +6T:FAVORED +CHOSEN, +4T:FOCUSED +INFALLIBLE), FOES:: ONE OF (+4T:PUNCTURE -3HP, +4T:VULNERABLE +1T:STUN +CRITICAL FLAW, +6T:CURSED +FORSAKEN, +4T:FEAR +MADNESS)",
        anim: "",
        autohit: true,
        usage: {
            act: "%USER DRAWS THE WHEEL OF FORTUNE"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let allyTeam = user.team.name
            let enemyTeam = user.enemyTeam.name

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                advanceAfterExec: true, beingUsedAsync, user,
                exec: (actor) => {

                    switch(actor.team.name) {
                        case allyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                beneficial: true,
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkchoir",
									rate: 0.5
								},
                                hitExec: ()=> {
									let rand = Math.random()
									if(rand < 0.25) {
										combatHit(target, {amt: -3, origin: user, autohit: true, beneficial: true});
										addStatus({target: actor, origin: user, status: "regen", length: 4}); 
									} else if(rand < 0.5) {
										addStatus({target: actor, origin: user, status: "surge", length: 1}); 
										addStatus({target: actor, origin: user, status: "evasion", length: 4}); 
									} else if(rand < 0.75) {
										addStatus({target: actor, origin: user, status: "favored", length: 6});
										addStatus({target: actor, origin: user, status: "chosen", length: 1}); 
									} else {
										addStatus({target: actor, origin: user, status: "focused", length: 4});
										addStatus({target: actor, origin: user, status: "infallible", length: 1});
									}
								}
                            })
                        break

                        case enemyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkfairy",
									rate: 0.5
								},
                                hitExec: ()=> {
									let rand1 = Math.random()
									if(rand1 < 0.25) {
										combatHit(target, {amt: 3, origin: user, autohit: true, beneficial: false});
										addStatus({target: actor, origin: user, status: "puncture", origin: user, length: 4}); 
									} else if(rand1 < 0.5) {
										addStatus({target: actor, origin: user, status: "stun", origin: user, length: 1});
										addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 4});
										addStatus({target: actor, origin: user, status: "critical_flaw", origin: user, length: 1});											
									} else if(rand1 < 0.75) {
										addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 6});
										addStatus({target: actor, origin: user, status: "forsaken", origin: user, length: 1}); 
									} else {
										addStatus({target: actor, origin: user, status: "fear", origin: user, length: 4});
										addStatus({target: actor, origin: user, status: "madness", origin: user, length: 1});
									}
								}
                            })                            
                        break
                    }
                }
            })
        }
    },
	
	env.ACTIONS.tarot_thewheeloffortune_reversed = {
        slug: "tarot_thewheeloffortune_reversed",
        name: "TAROT:: The Wheel Of Fortune, Reversed",
        type: 'special',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
        autohit: true,
        crit: 0,
        usage: {
            act: "%USER DRAWS THE WHEEL OF FORTUNE, REVERSED"
        },
        noRepeat: true,
        possiblePassives: ["light_veilkdrop", "light_humorist", "eyes_dancer", "bone_adaptive", "claws_chitin", "light_glee", "eyes_hypercritical", "malware_drill", "malware_rot", "weak_point"],
        exec: function(user, target, beingUsedAsync) {
			let actor = user

                    env.rpg.insertAdjacentHTML('beforeend', `
                    <figure id="chancepanel" class="hidden" for="${actor.slug}">
                        <img src="/img/sprites/flantrusive/panelbase.gif">
                        <div class="wheel">
                            <ul>
                                <li class="d1">1</li>
                                <li class="d2">2</li>
                                <li class="d3">3</li>
                                <li class="d4">4</li>
                                <li class="d5">5</li>
                                <li class="d6">6</li>
                            </ul>
                        </div>
                        <div class="display">
                            <ol>
                                <li class="d1">1. life up</li>
                                <li class="d2">2. main up</li>
                                <li class="d3">3. unlucky</li>
                                <li class="d4">4. bomb</li>
                                <li class="d5">5. unlucky</li>
                                <li class="d6">6. change</li>
                            </ol>
                        </div>
                        <div class="result">
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </figure>`)
                
                    actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
                    actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
                    actor.chancePanel.spin = (state) => { 
                        actor.chancePanel.removeAttribute("chosen")
                        actor.chancePanel.classList.toggle("spinning", state) 
                        actor.chancePanel.result.innerHTML = "???"
                    }
                
                    actor.chancePanel.stopAndResult = () => { 
                        let result = rand(1, 7)
                        actor.chancePanel.spin(false)
                        actor.chancePanel.setAttribute("chosen", result)
                
                        return result
                    }
			setTimeout(()=>{
				if(!user.chancePanel) throw 'ok intrusive spawned wrong';
				let action = this

				user.box.classList.add("disable")
				user.chancePanel.classList.add("active")
				user.chancePanel.classList.remove("hidden")
				user.chancePanel.spin(true)

				play("talkfairy", 0.5)
				let result

				setTimeout(()=>{
					result = user.chancePanel.stopAndResult()
					user.box.classList.remove("disable")
					playCombatCrit()
				}, 1000)

				setTimeout(()=>{
					switch(result) {
						case 1: // life up - gives 5HP and 5 turns of regen to allies
							user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
							env.GENERIC_ACTIONS.teamWave({
								team: user.team,
								exec: (actor, i) => {
									env.GENERIC_ACTIONS.singleTarget({
										beneficial: true,
										autohit: true,
										action,
										amt: -5,
										canCrit: false,
										user, 
										target: actor,
										hitSfx: {
											name: 'talklaugh',
											rate: 0.5
										},
										hitStatus: {
											name: 'regen',
											length: 5
										},
									})
								},
								advanceAfterExec: true, beingUsedAsync
							})
						break

						case 2: // main up - allies get focus and empowered
							user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
							env.GENERIC_ACTIONS.teamWave({
								team: user.team,
								exec: (actor, i) => {
									env.GENERIC_ACTIONS.singleTarget({
										beneficial: true,
										autohit: true,
										action,
										amt: 0,
										canCrit: false,
										user, 
										target: actor,
										hitSfx: {
											name: 'talklaugh',
											rate: 0.5
										},
										hitStatus: {
											name: 'focused',
											length: 2
										},
										genExec: ({target}) => {
											addStatus({target, status: "empowered", length: 1, noReact: true})
										}
									})
								},
								advanceAfterExec: true, beingUsedAsync
							})
						break

						case 3: // unlucky
						case 5: // gives enemies focus and empowered
							user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"

							env.GENERIC_ACTIONS.teamWave({
								team: user.enemyTeam,
								exec: (actor, i) => {
									env.GENERIC_ACTIONS.singleTarget({
										beneficial: true,
										autohit: true,
										action,
										amt: 0,
										canCrit: false,
										user, 
										target: actor,
										hitSfx: {
											name: 'talklaugh',
											rate: 0.5
										},
										hitStatus: {
											name: 'focused',
											length: 2
										},
										genExec: ({target}) => {
											addStatus({target, status: "empowered", length: 1, noReact: true})
										}
									})
								},
								advanceAfterExec: true, beingUsedAsync
							})
						break

						case 4: // bombs - spawns a bastard bomb
							user.chancePanel.result.innerHTML = "BOOM :=)"
							play('dull', 0.8, 1)

							if(user.team.members.length < 6) {
								let bomb = midCombatEnemyAdd("intrusive_bomblet", 'right')
								if(bomb){
									addStatus({target: bomb, status: "weak_point", length: 1})
									addStatus({target: bomb, status: "ethereal", length: 1})
									delete bomb.statusImmunities
								}
							} else {
								useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "intrusivefish"})
							}
						break

						case 6: // change - gives everyone a special passive that's overridden by each change roll
							user.chancePanel.result.innerHTML = "THINK AGAIN"
							env.GENERIC_ACTIONS.teamWave({
								arbitraryActorList: env.rpg.turnOrder,
								exec: (actor, i) => {
									env.GENERIC_ACTIONS.singleTarget({
										beneficial: true,
										autohit: true,
										action,
										amt: 0,
										canCrit: false,
										user, 
										target: actor,
										hitSfx: {
											name: 'talkfairy',
											rate: 0.5
										},
										genExec: ({target}) => {
											let currentStatuses = target.statusEffects.map(status => status.slug)
											let possiblePassives = this.possiblePassives.filter(statusName => !currentStatuses.includes(statusName))

											console.log("in with", target, possiblePassives)

											//special ones can happen on certain creatures
											if(
												!target.slug.includes("intrusive") ||
												target.slug == "intrusive_bishopfreak"
											) possiblePassives.push("visionary")

											if(
												!target.slug.includes("intrusive") ||
												target.slug == "intrusive_bishopfreak" ||
												target.slug == "intrusive_statusoid"
											) possiblePassives.push("active_support")

											if(
												!target.slug.includes("intrusive") ||
												target.slug == "intrusive_bishopfreak" ||
												target.slug == "intrusive_statusoid"
											) possiblePassives.push("impatient")
											
											// remove passive beforehand if one exists
											if(target.intrusivePassive) { removeStatus(target, target.intrusivePassive, {forceRemoveStatus: true}) }
											target.intrusivePassive = possiblePassives.sample()
											addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
										}
									})
								},
								advanceAfterExec: true, beingUsedAsync
							})
						break
					}
				}, 1500)

				setTimeout(()=>user.chancePanel.classList.remove("active"), 3500)
			}, 0)
        }
    },
	
	
	env.ACTIONS.tarot_justice = { //beneficial card
        slug: "tarot_justice",
        name: "TAROT:: Justice",
        type: 'special',
        desc: "'reveal a terrible truth';'mark self for death';'randomly affect enemy team'",
        anim: "",
        help: "SELF::+3T:DESTABILIZE +2T:VULNERABLE +CRITICAL FLAW, FOES::AUTOHIT ONE OF (+3T:STUN, +4T:DESTABILIZED +4T:OPEN WOUND, +4T:FEAR +MADNESS)\nSPECIAL::25% CHANCE TO REDUCE FOE HP BY 75%",
        usage: {
            act: "%USER DRAWS JUSTICE"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.25)
            addStatus({target: user, status: "destabilized", length: 3});
            addStatus({target: user, status: "vulnerable", length: 2});
			addStatus({target: user, status: "critical_flaw", length: 1});


            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    let rand = Math.random()
                    if(rand < 0.3) {
                        play("talkfairy", 1)
                        addStatus({target: actor, origin: user, status: "destabilized", length: 4});
						addStatus({target: actor, origin: user, status: "open_wound", length: 4});
                        
                    } else if(rand < 0.6) {
                        play("fear", 0.5)
                        addStatus({target: actor, origin: user, status: "fear", length: 4}); 
						addStatus({target: actor, origin: user, status: "madness", length: 1});
                    } else {
                        play("fear", 1)
                        addStatus({target: actor, origin: user, status: "stun", length: 3}); 
                    }

                    if(Math.random() < 0.25) {
                        
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "REPENT",
                            size: 2
                        })
                        
                        actor.hp = Math.floor(actor.hp * 0.25)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                    }
                },
                
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },
	
	env.ACTIONS.tarot_justice_reversed = {
        slug: "tarot_justice_reversed",
        name: "TAROT:: Justice, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::BENEFICIAL STATUS INVERSION",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS JUSTICE, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.5
                        },
                        genExec: ({target}) => {
                            invertStatuses(actor, (statusObj)=>statusObj.beneficial)
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thehangedman = { //beneficial card
        slug: "tarot_thehangedman",
        name: "TAROT:: The Hanged Man",
        type: 'special',
        desc: "'intercept all attacks on allies';'prepare to take great damage'",
        help: "ALLIES::+4T:REDIRECTION (TO USER), SELF::+2T:CARAPACE +2T:SPIKES +SACRIFICE -VULNERABLE",
        anim: "basic-attack",
        accuracy: 1,
        crit: 0,
        usage: {
            act: "%USER DRAWS THE HANGED MAN"
        },
        exec: function(user, target, beingUsedAsync) {
            reactDialogue(user, `give_redirection`)

            addStatus({target: user, status: "carapace", length: 2, noReact: true}); 
            addStatus({target: user, status: "spikes", length: 2, noReact: true}); 
			addStatus({target: user, status: "sacrifice", length: 1, noReact: true}); 
            removeStatus(user, "vulnerable") 

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    addStatus({target: actor, origin: user, status: "redirection", length: 4}); 
                    play('guard', 2, 0.75);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thehangedman_reversed = { //beneficial card
        slug: "tarot_thehangedman_reversed",
        name: "TAROT:: The Hanged Man, Reversed",
        type: 'special',
        desc: "'extend self beyond limits';'spend own health for total destruction'",
        help: "SELF::+2T:DESTABILIZED +1T:VULNERABLE\nFOES::100% SPECIAL\nSPECIAL::REDUCE USER HP TO 1, DEALING 200% LOST HP AS DAMAGE SPLIT OVER LIVING FOES (MIN:1)",
        anim: "basic-attack",
        usage: {
            act: "%USER DRAWS THE HANGED MAN, REVERSED"
        },
        accuracy: 1,
        crit: 0,
        amt: 0,
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let living = user.enemyTeam.members.reduce((acc, mem) => acc + (mem.state != "dead" ? 1 : 0), 0)
            let hpAmt = user.hp - 1
            let splitAmt = Math.max(Math.floor((hpAmt * 2) / living), 1)

            user.hp = 1
            addStatus({target: user, status: "destabilized", length: 2, noReact: true})
			addStatus({target: user, status: "vulnerable", length: 1, noReact: true})

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.shoot
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration * 0.5;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot2' },
                            specialAmt: splitAmt
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        },
    }, 
	
	env.ACTIONS.tarot_death = {
        slug: "tarot_death",
        name: "TAROT:: Death",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::100% -3HP +2T:DESTABILIZED +2T:FEAR, 30%C x2",
        anim: "wobble",
        accuracy: 1,
        crit: 0.3,
		amt: 3,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS DEATH", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'dull',
                            rate: 0.75
                        },
                        hitExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "destabilized", length: 2});
							addStatus({target: actor, origin: user, status: "fear", length: 2});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_death_reversed = {
        slug: "tarot_death_reversed",
        name: "TAROT:: Death, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::90% -2HP +2T:WEAKENED +2T:FEAR +5T:ROT, 20%C x2 +2T:WEAKENED +2T:FEAR +5T:ROT +1T:STUN",
        anim: "wobble",
        accuracy: 1,
        crit: 0.3,
		amt: 3,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS DEATH, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talksignal',
                            rate: 0.75
                        },
                        hitExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "weakened", length: 2});
							addStatus({target: actor, origin: user, status: "fear", length: 2});
							addStatus({target: actor, origin: user, status: "rot", length: 5});
                        },
						critExec: ({target}) => {
							addStatus({target: actor, origin: user, status: "weakened", length: 2});
							addStatus({target: actor, origin: user, status: "fear", length: 2});
							addStatus({target: actor, origin: user, status: "rot", length: 5});
							addStatus({target: actor, origin: user, status: "stun", length: 1});
						}
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_temperance = { //beneficial
        slug: "tarot_temperance",
        name: "TAROT:: Temperance",
        type: 'special',
        desc: "'reveal a terrible truth';'mark self for death';'randomly affect enemy team'",
        anim: "",
        help: "FOES::SET HP TO HALF OF MAX HP",
        usage: {
            act: "%USER DRAWS TEMPERANCE"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                        play('talkchoir', 0.5)
                        sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "PATIENCE",
                            size: 2
                        })
                        
                        actor.hp = Math.floor(actor.maxhp * 0.5)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "player_conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                },
                advanceAfterExec: true, beingUsedAsync, user,
                endCallback: ()=>{console.log('just called advance')}
            })
        }
    },
	
	env.ACTIONS.tarot_temperance_reversed = {
        slug: "tarot_temperance_reversed",
        name: "TAROT:: Temperance, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::REDUCE ACTOR HP BY 75%",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS TEMPERANCE, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'talkfairy',
                            rate: 0.25
                        },
                        genExec: ({target}) => {
                            sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "REPENT",
                            size: 2
                        })
                        
                        actor.hp = Math.floor(actor.hp * 0.25)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thedevil = { //beneficial card
        slug: "tarot_thedevil",
        name: "TAROT:: The Devil",
        type: 'special',
        desc: "'receive prophetic visions to bless allies';'incite divine intervention against foes'",
        help: "FOES:: +2T:VULNERABLE, +1T:STUN, ALLIES:: +2T:FOCUSED +SURGE",
        anim: "",
        autohit: true,
        usage: {
            act: "%USER DRAWS THE DEVIL"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            let allyTeam = user.team.name
            let enemyTeam = user.enemyTeam.name

            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                advanceAfterExec: true, beingUsedAsync, user,
                exec: (actor) => {

                    switch(actor.team.name) {
                        case allyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                beneficial: true,
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkchoir7",
									rate: 2
								},
                                hitExec: ()=> {
										addStatus({target: actor, origin: user, status: "focused", origin: user, length: 2});
										addStatus({target: actor, origin: user, status: "surge", origin: user, length: 1});
									}
                            })
                        break

                        case enemyTeam:
                            env.GENERIC_ACTIONS.singleTarget({
                                action, 
                                user, 
                                target: actor,
                                canCrit: false,
								hitSfx: {
									name: "talkfairy",
									rate: 0.5
								},
                                hitExec: ()=> {
										addStatus({target: actor, origin: user, status: "vulnerable", origin: user, length: 2});
										addStatus({target: actor, origin: user, status: "stun", origin: user, length: 1});
									}
                            })                            
                        break
                    }
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
    env.ACTIONS.tarot_thedevil_reversed = { //beneficial card
        slug: "tarot_thedevil_reversed",
        name: "TAROT:: The Devil, Reversed",
        type: 'special',
        desc: "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        help: "SELF::+INCOHERENT, FOES::AUTOHIT -4HP 20%C x2 +1T:STUN",
        anim: "basic-attack",
        autohit: true,
        crit: 0.2,
        amt: 4,
        usage: {
            act: "%USER DRAWS THE DEVIl, REVERSED"
        },
        exec: function(user, target, beingUsedAsync) {
            addStatus({target: user, status: "incoherent", length: 1, noReact: true})
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i) => {
                    let anim = env.ACTION_ANIMS.flare
                    let baseDelay = ((env.ADVANCE_RATE * 0.2) * i)
                    let animDelay = baseDelay + anim.duration;
                        
                    setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                    setTimeout(function(){
                        env.GENERIC_ACTIONS.singleTarget({
                            beneficial: true,
                            action: action, 
                            user, 
                            target: actor,
                            hitSfx: { name: 'shot6', rate: 1.5 },
                            critSfx: { name: 'shot6', rate: 0.75 },
							critStatus: {
								name: 'stun',
								length: 1
							},
                        })
                    }, animDelay);
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thetower = {
        slug: "tarot_thetower",
        name: "TAROT:: The Tower",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::100% -1HP +3T:FEAR +3T:PUNCTURE +3T:VULNERABLE +AMPLIFIER, 10%C x2",
        anim: "wobble",
        accuracy: 1,
        crit: 0.3,
		amt: 1,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS THE TOWER", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talksignal',
                            rate: 0.75
                        },
                        hitExec: ({target}) => {
							addStatus({target: actor, origin: user, status: "fear", length: 3});
							addStatus({target: actor, origin: user, status: "puncture", length: 3});
							addStatus({target: actor, origin: user, status: "vulnerable", length: 3});
							addStatus({target: actor, origin: user, status: "hands_malfunction", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thetower_reversed = {
        slug: "tarot_thetower_reversed",
        name: "TAROT:: The Tower, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::100% +1HP +2T:FOCUSED +2T:REGEN +2T:EVASION 10%C x2",
        anim: "wobble",
        accuracy: 1,
        crit: 0.3,
		amt: -1,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS THE TOWER, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'talkflower',
                            rate: 0.75
                        },
                        hitExec: ({target}) => {
							addStatus({target: actor, origin: user, status: "focused", length: 2});
							addStatus({target: actor, origin: user, status: "regen", length: 2});
							addStatus({target: actor, origin: user, status: "evasion", length: 2});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thestar = { //beneficial card
        slug: "tarot_thestar",
        name: "TAROT:: The Star",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::AUTOHIT +3HP +2T:REGEN +5T:FAVORED +CHOSEN",
        usage: {
            act: "%USER DRAWS THE STAR"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 2)


            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
					combatHit(actor, {amt: -3, origin: user, autohit: true, beneficial: true});
					addStatus({target: actor, origin: user, status: "regen", origin: user, length: 2}); 
                    addStatus({target: actor, origin: user, status: "favored", origin: user, length: 5, noReact: true}); 
					addStatus({target: actor, origin: user, status: "chosen", origin: user, length: 1, noReact: true});
                    play('talkflower', 1);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_thestar_reversed = { //beneficial card
        slug: "tarot_thestar_reversed",
        name: "TAROT:: The Star, Reversed",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "FOES::AUTOHIT -3HP +2T:PUNCTURE +5T:CURSED +FORSAKEN",
        usage: {
            act: "%USER DRAWS THE STAR, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 2)


            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
					combatHit(actor, {amt: 3, origin: user, autohit: true, beneficial: false});
					addStatus({target: actor, origin: user, status: "puncture", origin: user, length: 2}); 
                    addStatus({target: actor, origin: user, status: "cursed", origin: user, length: 5, noReact: true}); 
					addStatus({target: actor, origin: user, status: "forsaken", origin: user, length: 1, noReact: true});
                    play('talkfairy', 1);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_themoon = { //beneficial card
		slug: "tarot_themoon",
		name: "TAROT:: The Moon",
		type: 'special+summon+nomimic',
		desc: "'collect additional allies from elsewhere'",
		help: "SUMMON::6 HALLUCINATIONS (MAX: 12 SUMMONS)\nALLIES::+3T:FAVORED",
		anim: "heal",
		accuracy: 1,
		crit: 0,
		itemAction: true, //we have to lie here so that imps can't use this action
		noRepeat: true,
		exec: function(user, target, beingUsedAsync) {
			actionMessage(user, "%USER DRAWS THE MOON", target, 'none', 2000);
			play('dull', 0.8, 1);
			
			//try to center the dude
			if(user.team.members.length == 14) {
				let uI = user.team.members.findIndex(a => a.slug == user.slug)
				if(uI < 14) midCombatAllyAdd('player_hallucination', 'left')
				else if(uI >= 14) midCombatAllyAdd('player_hallucination', 'right')
			} else {
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'right')
				midCombatAllyAdd('player_hallucination', 'right')
				midCombatAllyAdd('player_hallucination', 'right')
			}
			setTimeout(()=>{             
				env.GENERIC_ACTIONS.teamWave({
						team: user.team,
						exec: (actor, i)=>{
							addStatus({target: actor, origin: user, status: "favored", origin: user, length: 3, noReact: true}); 
							play('mend', 0.5);
						}
					})
				}, env.ADVANCE_RATE * 0.5)
			setTimeout(()=>advanceTurn(user), 1000)
		},
		disableIf: (actor) => {if(actor.team.members.length > 15) return "TOO MANY ALLIES" }
	}
	
	env.ACTIONS.tarot_themoon_noadvance = { //beneficial card
		slug: "tarot_themoon_noadvance",
		name: "TAROT:: The Moon",
		type: 'special+summon+nomimic',
		desc: "'collect additional allies from elsewhere'",
		help: "SUMMON::6 HALLUCINATIONS (MAX: 12 SUMMONS)\nALLIES::+3T:FAVORED",
		anim: "heal",
		accuracy: 1,
		crit: 0,
		itemAction: true, //we have to lie here so that imps can't use this action
		noRepeat: true,
		exec: function(user, target, beingUsedAsync) {
			actionMessage(user, "%USER DRAWS THE MOON", target, 'none', 2000);
			play('dull', 0.8, 1);
			
			//try to center the dude
			if(user.team.members.length == 14) {
				let uI = user.team.members.findIndex(a => a.slug == user.slug)
				if(uI < 14) midCombatAllyAdd('player_hallucination', 'left')
				else if(uI >= 14) midCombatAllyAdd('player_hallucination', 'right')
			} else {
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'left')
				midCombatAllyAdd('player_hallucination', 'right')
				midCombatAllyAdd('player_hallucination', 'right')
				midCombatAllyAdd('player_hallucination', 'right')
			}
			setTimeout(()=>{             
				env.GENERIC_ACTIONS.teamWave({
						team: user.team,
						exec: (actor, i)=>{
							addStatus({target: actor, origin: user, status: "favored", origin: user, length: 3, noReact: true}); 
							play('mend', 0.5);
						}
					})
				}, env.ADVANCE_RATE * 0.5)
		},
		disableIf: (actor) => {if(actor.team.members.length > 15) return "TOO MANY ALLIES" }
	}
	
	env.ACTIONS.tarot_themoon_reversed = {
        slug: "tarot_themoon_reversed",
        name: "TAROT:: The Moon, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::AUTOHIT +2T:FEAR, +MADNESS +SURGE",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS THE MOON, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'fear',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "surge", length: 1});
							addStatus({target: actor, origin: user, status: "fear", length: 2});
							addStatus({target: actor, origin: user, status: "madness", length: 1});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_thesun = { //beneficial card
        slug: "tarot_thesun",
        name: "TAROT:: The Sun",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::+3T:FOCUSED +JOY",
        usage: {
            act: "%USER DRAWS THE SUN"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkflower", 1)

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 3, noReact: true});
					addStatus({target: actor, origin: user, status: "joy", origin: user, length: 1, noReact: true}); 					
                    play('talkflower', 1, 0.8);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_thesun_reversed = { //beneficial card
        slug: "tarot_thesun_reversed",
        name: "TAROT:: The Sun, Reversed",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "FOES::+3T:FEAR +DESPAIR",
        usage: {
            act: "%USER DRAWS THE SUN, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 1)

            env.GENERIC_ACTIONS.teamWave({
                team: user.enemyTeam,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "fear", origin: user, length: 3, noReact: true});
					addStatus({target: actor, origin: user, status: "despair_malfunction", origin: user, length: 1, noReact: true}); 					
                    play('talkfairy', 0.5, 0.35);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_judgement = {
        slug: "tarot_judgement",
        name: "TAROT:: Judgement",
        type: 'special',
        desc: "'grasp the nature of this place';'recognize and exploit framing device'",
        anim: "wobble",
        help: "ALL::+3T:EMPOWERED -DOWN",
        usage: {
            act: "%USER DRAWS JUDGEMENT"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 1.5)
            let action = this
            
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 0.5
                        },
                        genExec: ({target}) => {
							addStatus({target, origin: user, status: "empowered", origin: user, length: 3, noReact:true});
							if(target.state == "dead") {
								target.hp = Math.floor(target.maxhp * 0.25)
								combatRevive(target)
								reactDialogue(target, 'receive_rez')
							}
						}
					})
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_judgement_reversed = {
        slug: "tarot_judgement_reversed",
        name: "TAROT:: Judgement, Reversed",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence'",
        help: "ALL::AUTOHIT +3T:WEAKENED +3T:CURSED",
        anim: "wobble",
        autohit: true,
        canCrit: false,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "%USER DRAWS JUDGEMENT, REVERSED", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'talkcroak',
                            rate: 0.75
                        },
                        genExec: ({target}) => {
							addStatus({target: actor, origin: user, status: "weakened", length: 3});
							addStatus({target: actor, origin: user, status: "cursed", length: 3});
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.tarot_theworld = { //beneficial card
        slug: "tarot_theworld",
        name: "TAROT:: The World",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::+2T:FOCUSED +2T:FAVORED +INFALLIBLE +JOY +CHOSEN",
        usage: {
            act: "%USER DRAWS THE WORLD"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkchoir7", 2)

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
                    addStatus({target: actor, origin: user, status: "focused", origin: user, length: 2, noReact: true}); 
					addStatus({target: actor, origin: user, status: "favored", origin: user, length: 2, noReact: true}); 
					addStatus({target: actor, origin: user, status: "infallible", origin: user, length: 1, noReact: true}); 
					addStatus({target: actor, origin: user, status: "joy", origin: user, length: 1, noReact: true}); 
					addStatus({target: actor, origin: user, status: "chosen", origin: user, length: 1, noReact: true}); 
                    play('talkflower', 0.75);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
	env.ACTIONS.tarot_theworld_reversed = {
        slug: "tarot_theworld_reversed",
        name: "TAROT:: The World, Reversed",
        type: 'self+autohit+support',
        desc: "'back off';'focus entire team'",
        anim: "",
        help: "ALLIES::SWAP REMAINING HP FOR LOST HP",
        usage: {
            act: "%USER DRAWS THE WORLD, REVERSED"
        },
        autohit: true,
        exec: function(user, target, beingUsedAsync) {
            play("talkfairy", 0.25)

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i)=>{
							sendFloater({
                            target: actor,
                            type: "arbitrary",
                            specialClass: "fate",
                            arbitraryString: "PERISH",
                            size: 2
                        })
                        
                        actor.hp = -(actor.hp - actor.maxhp)

                        //special handling for weird hp usage
                        let conjoin = actor.statusEffects.find(status=>status.slug == "conjoined")
                        if(conjoin) conjoin.events.onCombatHit();
                        updateStats({actor})
                    play('talkfairy', 0.25);
                },
				advanceAfterExec: true, beingUsedAsync, user,
            })

            return 'nothing'
        }
    },
	
		//hands utility augment
	env.ACTIONS.special_tarot = {
		slug: "special_tarot",
		name: "Tarot",
		type: 'special',
		desc: "'draw card from deck';'reap consequences'",
		help: "SELF/ALLIES/FOES/ALL:: 100% RANDOM SPECIAL EFFECT",
		anim: "heal",
		autohit: true,
		canCrit: false,
		usage: {
			act: "%USER CONSIDERS THE DECK CAREFULLY"
		},
		exec: function(user, target){
			setTimeout(()=>{
				let power = 0
				let fated = user.statusEffects.find(status => status.slug == "fated_hands")
				let rand = Math.random()
				
				let majorArcana = ['tarot_thefool','tarot_thefool_reversed','tarot_themagician','tarot_themagician_reversed','tarot_thehighpriestess','tarot_thehighpriestess_reversed','tarot_theempress','tarot_theempress_reversed','tarot_theemperor','tarot_theemperor_reversed','tarot_thehierophant','tarot_thehierophant_reversed','tarot_thelovers','tarot_thelovers_reversed','tarot_thechariot','tarot_thechariot_reversed','tarot_strength','tarot_strength_reversed','tarot_thehermit','tarot_thehermit_reversed','tarot_thewheeloffortune','tarot_thewheeloffortune_reversed','tarot_justice','tarot_justice_reversed','tarot_thehangedman','tarot_thehangedman_reversed','tarot_death','tarot_death_reversed','tarot_temperance','tarot_temperance_reversed','tarot_thedevil','tarot_thedevil_reversed','tarot_thetower','tarot_thetower_reversed','tarot_thestar','tarot_thestar_reversed','tarot_themoon','tarot_themoon_reversed','tarot_thesun','tarot_thesun_reversed','tarot_judgement','tarot_judgement_reversed','tarot_theworld','tarot_theworld_reversed']
				if (rand > (1 - (fated ? fated.power * 0.1 : 0))) {
					majorArcana = ['tarot_themagician','tarot_thehighpriestess','tarot_thehighpriestess_reversed','tarot_theempress','tarot_theempress_reversed','tarot_theemperor','tarot_theemperor_reversed','tarot_thehierophant','tarot_thechariot','tarot_strength','tarot_strength_reversed','tarot_thehermit','tarot_thewheeloffortune','tarot_justice','tarot_thehangedman','tarot_thehangedman_reversed','tarot_thedevil','tarot_thedevil_reversed','tarot_thestar','tarot_thestar_reversed','tarot_themoon','tarot_thesun','tarot_thesun_reversed','tarot_theworld']
				}
				let chosenCard = majorArcana.sample()
				useAction(user, env.ACTIONS[chosenCard], target, {beingUsedAsync: false, reason: "tarot"})
				},
			env.ADVANCE_RATE * 1)
		}
	}
	
	env.ACTIONS.special_tarot_noadvance = {
		slug: "special_tarot_noadvance",
		name: "Tarot",
		type: 'special',
		desc: "'draw card from deck';'reap consequences'",
		help: "SELF/ALLIES/FOES/ALL:: 100% RANDOM SPECIAL EFFECT",
		anim: "heal",
		autohit: true,
		canCrit: false,
		usage: {
			act: "%USER CONSIDERS THE DECK CAREFULLY"
		},
		exec: function(user, target){
			setTimeout(()=>{
				let power = 0
				let fated = user.statusEffects.find(status => status.slug == "fated_hands")
				let rand = Math.random()
				
				let majorArcana = ['tarot_thefool','tarot_thefool_reversed','tarot_themagician_noadvance','tarot_themagician_reversed','tarot_thehighpriestess','tarot_thehighpriestess_reversed','tarot_theempress','tarot_theempress_reversed','tarot_theemperor','tarot_theemperor_reversed','tarot_thehierophant_noadvance','tarot_thehierophant_reversed','tarot_thelovers','tarot_thelovers_reversed','tarot_thechariot','tarot_thechariot_reversed','tarot_strength','tarot_strength_reversed_noadvance','tarot_thehermit','tarot_thehermit_reversed','tarot_thewheeloffortune','tarot_thewheeloffortune_reversed','tarot_justice','tarot_justice_reversed','tarot_thehangedman','tarot_thehangedman_reversed','tarot_death','tarot_death_reversed','tarot_temperance','tarot_temperance_reversed','tarot_thedevil','tarot_thedevil_reversed','tarot_thetower','tarot_thetower_reversed','tarot_thestar','tarot_thestar_reversed','tarot_themoon_noadvance','tarot_themoon_reversed','tarot_thesun','tarot_thesun_reversed','tarot_judgement','tarot_judgement_reversed','tarot_theworld','tarot_theworld_reversed']
				if (rand > (1 - (fated ? fated.power * 0.1 : 0))) {
					majorArcana = ['tarot_themagician_noadvance','tarot_thehighpriestess','tarot_thehighpriestess_reversed','tarot_theempress','tarot_theempress_reversed','tarot_theemperor','tarot_theemperor_reversed','tarot_thehierophant_noadvance','tarot_thechariot','tarot_strength','tarot_strength_reversed_noadvance','tarot_thehermit','tarot_thewheeloffortune','tarot_justice','tarot_thehangedman','tarot_thehangedman_reversed','tarot_thedevil','tarot_thedevil_reversed','tarot_thestar','tarot_thestar_reversed','tarot_themoon_noadvance','tarot_thesun','tarot_thesun_reversed','tarot_theworld']
				}
				let chosenCard = majorArcana.sample()
				useAction(user, env.ACTIONS[chosenCard], target, {beingUsedAsync: false, reason: "tarot_noadvance"})
				},
			env.ADVANCE_RATE * 1)
		}
	}
	
	env.ACTIONS.special_player_handssummon = {
		slug: "special_player_handssummon",
		name: "Daemon Portal",
		type: 'special+summon+nomimic',
		desc: "'collect daemons from elsewhere'",
		help: "SUMMON DAEMONIC ALLY (MAX:4 DAEMONS)",
		usage: {
			act: "%USER BINDS A DAEMON TO THIS PLANE"
		},
		anim: "heal",
		accuracy: 1,
		crit: 0,
		itemAction: true, //we have to lie here so that imps can't use this action
		noRepeat: true,
		exec: function(user) {
			if(user.team.members.filter(m=>m.slug.includes('hands')).length > 4) {
				play('dull', 0.6);
				play('talkfairy', 0.5);

				let daemon_peasant = ['player_hands_critta_pawn','player_hands_critta_knight','player_hands_critta_bishop','player_hands_critta_rook']
				let daemon_royal = ['player_hands_critta_queen','player_hands_critta_king']
				let daemon_divine = ['player_hands_critta_dragon','player_hands_critta_unicorn','player_hands_critta_princess','player_hands_critta_princess_defensive','player_hands_critta_princess_hybrid','player_hands_critta_superknight']
				
				var newAllySlug = daemon_peasant.sample()
				var newAllySlug1 = daemon_royal.sample()
				var newAllySlug2 = daemon_divine.sample()

				//try to center the dude
				if(user.team.members.length == 14) {
					let uI = user.team.members.findIndex(a => a.slug == user.slug)
					if(uI < 3) midCombatAllyAdd('player_hands_critta_pawn', 'left')
					else if(uI >= 3) midCombatAllyAdd('player_hands_critta_pawn', 'right')	
				} else {
					let rand = Math.random()
					if (rand > 0.5) {
						let rand1 = Math.random()
						if (rand1 < 0.5) {
							midCombatAllyAdd(newAllySlug,'left')
						} 
						else if (rand1 < 0.8) {
							midCombatAllyAdd(newAllySlug1,'left')	
						}
						else {
							midCombatAllyAdd(newAllySlug2,'left')	
						}
					}
					else {
						let rand2 = Math.random()
						if (rand2 < 0.5) {
							midCombatAllyAdd(newAllySlug,'right')
						} 
						else if (rand2 < 0.8) {
							midCombatAllyAdd(newAllySlug1,'right')
						}
						else {
							midCombatAllyAdd(newAllySlug2,'right')
						}
					}
				}
				setTimeout(()=>advanceTurn(user), 200)
			}
		},
		disableIf: (actor) => {if(user.team.members.filter(m=>m.slug.includes('hands')).length < 4) return "TOO MANY ALLIES" }
	}
	//metal actions
		//metal secondary
	env.ACTIONS.metal_barrier = {
        slug: "metal_barrier",
        name: "Barrier",
        verb: "shield",
        type: 'support+target+self+autohit',
        desc: "'apply ablative corru layer';'chance to apply passive protection mechanism'",
        help: "AUTOHIT +2BP, 20%C +2BP ONE OF (+REPAIRS, +HARDENED, +CHITINOUS)",
        anim: "heal",
        usage: {
            act: "%USER SHIELDS %TARGET",
            crit: "%TARGET FEELS INVINCIBLE",
            hit: "%TARGET GAINS A THIN BARRIER",
            miss: "IT DOES NOT STICK"
        },
        crit: 0.2,
        autohit: true,
		canCrit: true,
		beneficial: true,
        amt: 0,
        exec: function(user, target) {
            return env.GENERIC_ACTIONS.singleTarget({
                beneficial: true,
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'mend',
                    rate: 1.5
                },
				critSfx: {
					name: 'guard',
					rate: 1.5
				},
				hitExec: ({target})=> {
					combatHit(target, {amt: 2, origin: user, autohit: true, beneficial: true, type: 'barrier'});
				},
				critExec: ({target})=> {
					combatHit(target, {amt: 2, origin: user, autohit: true, beneficial: true, type: 'barrier'});
					let rand = Math.random()
                    if(rand < 0.3) {
                        addStatus({target, origin: user, status: "repairs", origin: user, length: 1}); 
                        
                    } else if(rand < 0.6) {
                        addStatus({target, origin: user, status: "hardened", origin: user, length: 1}); 

                    } else {
                        addStatus({target, origin: user, status: "chitinous", origin: user, length: 1}); 
                    }
				}
            })
        }
    },
	
		//metal primary
	env.ACTIONS.salvage = {
		slug: "salvage",
		name: "Salvage",
		type: 'summon+target',
		desc: "'utilize golem repair tool and attached drone';'chance to use micro-vat to fabricate golem'",
		help: "80% -1HP, 10%C +2T:WEAKENED SUMMON::+1 GOLEM (MAX:4)",
		anim: "basic-attack",
		accuracy: 0.8,
		crit: 0.1,
		amt: 1,
		usage: {
			act: "%USER GRASPS AT %TARGET",
			crit: "%USER FABRICATES A GOLEM",
			hit: "%TARGET IS STRUCK",
			miss: "%TARGET EVADES"
		},
		exec: function(user, target) {
			let fated = user.statusEffects.find(status => status.slug == "fated_metal")
			return env.GENERIC_ACTIONS.singleTarget({
				action: this,
				user,
				target,
				critStatus: {
					name: 'weakened',
					length: 2
				},
				critExec: ({target}) => {
					if(user.team.name == "ally") {
							let metal_peasant = ['player_metal_basic_golem','player_metal_constructor_golem','player_metal_maintcloak','player_metal_pressure_golem','player_metal_surgeon_golem']
							let metal_royal = ['player_metal_archival_golem','player_metal_dull_golem']
							
							let newAllySlug = metal_peasant.sample()
							let newAllySlug1 = metal_royal.sample()
							
							let rand = Math.random()
							if (rand < 0.75) {
								user.lastSide = !user.lastSide
								if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
									midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
								}
							} else {
								user.lastSide = !user.lastSide
								if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
									midCombatAllyAdd(newAllySlug1, user.lastSide ? "left" : "right")
								}
							}
					} else {
						let metal_peasant_enemy = ['metal_basic_golem','metal_constructor_golem','metal_maintcloak','metal_pressure_golem','metal_surgeon_golem']
						let metal_royal_enemy = ['metal_archival_golem','metal_dull_golem']
						
						let newEnemySlug = metal_peasant_enemy.sample()
						let newEnemySlug1 = metal_royal_enemy.sample()
						
						let rand = Math.random()
						if (rand < 0.75) {
							user.lastSide = !user.lastSide
							if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
								midCombatEnemyAdd(newEnemySlug, user.lastSide ? "left" : "right")
							}
						} else {
							user.lastSide = !user.lastSide
							if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
								midCombatEnemyAdd(newEnemySlug1, user.lastSide ? "left" : "right")
							}
						}
					}
				}
			})
		}
	},
		//metal primary augment
	env.ACTIONS.reforge = {
		slug: "reforge",
		name: "Reforge",
		type: 'summon+target+nomimic',
		desc: "'utilize golem repair tool and attached foundry vat';'use siphoned sfer to construct greater golem'",
		help: "100% -2HP, 10%C +3T:WEAKENED SUMMON::+1 GREATER GOLEM (MAX:4)",
		anim: "basic-attack",
		accuracy: 1,
		crit: 0.1,
		amt: 2,
		itemAction: true, //we have to lie here so that imps can't use this action
		usage: {
			act: "%USER GRASPS AT %TARGET",
			crit: "%USER CONSTRUCTS A MASSIVE GOLEM",
			hit: "%TARGET IS STRUCK",
			miss: "%TARGET EVADES"
		},
		exec: function(user, target) {
			let fated = user.statusEffects.find(status => status.slug == "fated_metal")
			removeStatus(user, "windup")
			return env.GENERIC_ACTIONS.singleTarget({
				action: this,
				user,
				target,
				critStatus: {
					name: 'weakened',
					length: 3
				},
				critExec: ({target}) => {
					let metal_peasant = ['player_metal_basic_golem_mega','player_metal_constructor_golem_mega','player_metal_maintcloak_mega','player_metal_pressure_golem_mega','player_metal_surgeon_golem_mega']
					let metal_royal = ['player_metal_archival_golem_mega','player_metal_dull_golem_mega']
					
					let newAllySlug = metal_peasant.sample()
					let newAllySlug1 = metal_royal.sample()
					
					let rand = Math.random()
					if (rand < 0.75) {
						user.lastSide = !user.lastSide
						if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
							midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
						}
					} else {
						user.lastSide = !user.lastSide
						if(user.team.members.filter(m=>m.slug.includes('metal')).length < (fated ? fated.power + 4 : 4)) {
							midCombatAllyAdd(newAllySlug1, user.lastSide ? "left" : "right")
						}
					}
				}
			})
		}
	},
		//metal secondary augment
	env.ACTIONS.special_chitinous_barrier = {
        slug: "special_chitinous_barrier",
        name: "Defensive Cover",
        type: 'special',
        desc: "'apply ablative protection';'upgrades protection to provide passive defense'",
        help: "ALLIES::+2 BP +REPAIRS",
        anim: "cloak-barrier",
        autohit: true,
        crit: 0,
        amt: 2,
        usage: {
            act: "%USER SHIELDS THEIR ALLIES"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this

            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        type: 'barrier',
                        action, 
                        user, 
                        target: actor,
                        hitSfx: {
                            name: 'mend',
                            rate: 2
                        },
                        hitStatus: {
                            name: 'chitinous',
                            length: 1
                        },
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
		//metal utility augment
	env.ACTIONS.berserk_mega = {
        slug: "berserk_mega",
        name: "Taunt",
        type: 'autohit',
        desc: "'self-modify for maximum offense';'tempt foes into striking recklessly'",
        help: "+1T:DENATURED +2T:SERRATIONS -VULNERABLE",
        anim: "heal",
        usage: {
            act: "%USER MELTS INTO A MORE AGGRESSIVE SHAPE"
        },
        
        exec: function(user, target) {
            play('destabilize', 0.5);
            removeStatus(user, "vulnerable"); 
            addStatus({target: user, status: "denatured", length: 1, noReact: true}); 
            addStatus({target: user, status: "serrations", length: 2, noReact: true}); 
            return 'nothing';
        }
    },
	//pain actions
		//pain primary 1
	env.ACTIONS.playershelf_crush = {
		slug: "playershelf_crush",
		name: "Crush",
		verb: "crush",
		type: 'target',
		desc: "'utilize long limbs to eviscerate to a target';'guarantee strike'",
		anim: "basic-attack",
		help: "100% -2HP",
		usage: {
			act: "%USER LUNGES AT %TARGET",
			hit: "%TARGET TAKES A SOLID HIT",
			miss: "%TARGET ESCAPES BY A HAIR"
		},
		accuracy: 1,
		amt: 2,
		exec: function(user, target) {
			return env.GENERIC_ACTIONS.singleTarget({
				action: this, 
				user, 
				target,
				hitSfx: {
					name: 'stab',
					rate: 0.75
				},
				missSfx: {
					name: 'miss',
					rate: 0.75
				},
			})
		}
	}
		//pain primary 2
	env.ACTIONS.playershelf_annihilation = {
		slug: "playershelf_annihilation",
		name: "Annihilation",
		verb: "annihilate",
		type: 'target',
		desc: "'utilize long limbs to eviscerate a target';'maximize damage'",
		anim: "basic-attack",
		help: "50% -2HP (SELF:: -1HP), 50%C x2 +2T:PUNCTURE +1T:STUN (SELF:: -1HP)",
		usage: {
			act: "%USER LUNGES AT %TARGET",
			crit: "%TARGET IS BRUTALLY STABBED",
			hit: "%TARGET TAKES A SOLID HIT",
			miss: "%TARGET ESCAPED BY A HAIR"
		},
		accuracy: 0.5,
		crit: 0.5,
		amt: 2,
		exec: function(user, target) {
			return env.GENERIC_ACTIONS.singleTarget({
				action: this, 
				user, 
				target,
				hitSfx: {
					name: 'stab',
					rate: 0.75
				},
				missSfx: {
					name: 'miss',
					rate: 0.75
				},
				critExec: ({target})=>{
					addStatus({target, status: "stun", length: 1});
					addStatus({target, status: "puncture", length: 2});
					combatHit(user, {amt: 1, autohit: true, canCrit: false, redirectable: false, origin: user})
				},
				hitExec: ({target})=>{
					combatHit(user, {amt: 1, autohit: true, canCrit: false, redirectable: false, origin: user})
				}
			})
		}
	}
	
		//pain primary test
		//in theory, if i remove the actionAnim property, it should work fine, the only casualty being antishells using it will look kind of dumb
	env.ACTIONS.special_playershelf_annihilate = {
        slug: "special_playershelf_annihilate",
        name: "Annihilation",
        type: 'special+target',
        desc: "'utilize long limbs to eviscerate a target';'offer user responsive choice'",
        anim: "wobble",
        help: "CHOOSE::100% -2HP ::OR:: 50% -2HP (SELF:: -1HP), 50%C x2 +2T:PUNCTURE +1T:STUN (SELF:: -1HP)",
        usage: {
            act: "%USER LUNGES AT %TARGET",
            crit: "%TARGET IS BRUTALLY STABBED",
            hit: "%TARGET TAKES A SOLID HIT",
            miss: "%TARGET ESCAPED BY A HAIR"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
            let action = this

            //summon a div that lets the player click guaranteed or chance <--- we are modifying this to let the player choose between a high damage guarenteed strike or a self-damaging strike that can crit
            actionChoice({
                user: user,
                action: action,
                choiceText: `${user.name} lunges at ${target.name}...`,
                options: [
                    {text: "Guarantee strike", definition: "NOTE::'100% -2HP'"},
                    {text: "Try a riskier attack", definition: "NOTE::'50% -2HP (SELF:: -1HP), 50%C x2 +2T:PUNCTURE +1T:STUN (SELF:: -1HP)'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 2, acc: 1, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 2, acc: 0.5, crit: 0.5, origin: user})
							combatHit(user, {amt: 1, autohit: true, canCrit: false, redirectable: false, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
                            addStatus({target: target, origin: user, status: "puncture", length: 2, noReact: true})
							combatHit(user, {amt: 1, autohit: true, canCrit: false, redirectable: false, origin: user})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_hit')
                            play("stab", 0.75)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.75)
                            break;
                    }

                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    },

		//pain secondary
	env.ACTIONS.infiltrate = {
		slug: "infiltrate",
		name: "Infiltrate",
		type: 'target',
		desc: "'attempt to enter target body';'chance indirectly control actions'",
		help: "90% +2T:FEAR, 10%C -1HP +1T:PUNCTURE +1T:PUPPET",
		anim: "skitter",
		usage: {
			act: "%USER APPROACHES %TARGET",
			crit: "%TARGET IS PUPPETED FROM THE INSIDE OUT",
			hit: "%USER TERRIFIES %TARGET",
			miss: "%TARGET RECOILS"
		},
		accuracy: 0.9,
		crit: 0.1,
		amt: 0,
		exec: function(user, target) {
			return env.GENERIC_ACTIONS.singleTarget({
				action: this, 
				user, 
				target,
				hitSfx: {
					name: 'talksignal',
					rate: 1
				},
				hitExec: ()=>{
					reactDialogue(user, `give_fear`)
				},
				critSfx: {
					name: 'stab',
					rate: 0.55
				},
				critExec: ({target}) => {
                    addStatus({target, origin: user, status: "puppet", length: 1}); 
					addStatus({target, origin: user, status: "puncture", length: 1}); 
					combatHit(target, {amt: 1, crit: 0, autohit: true, origin: user});
				},
				hitStatus: {
					name: 'fear',
					length: 2
				},
			})
		}
	},
		//pain utility
	env.ACTIONS.special_raise = {
		slug: "special_raise",
		name: "Raise",
		type: 'special+summon',
		desc: "'utilize parasitic bioweapon';'bring foes bodies to terrible life'",
		help: "FOES::80% ONE OF (+2T:FEAR, +1T:PUNCTURE, +2T:VULNERABLE), 5%C -1HP + ONE OF (+2T:FEAR, +1T:PUNCTURE, +1T:WEAKENED) + SUMMON::+1 HUSK (MAX:4)",
		anim: "skitter",
		accuracy: 0.8,
		crit: 0.05,
		amt: 0,
		usage: {
			act: "%USER RAISES THE DEAD"
		},
		noRepeat: true,
		exec: function(user, target, beingUsedAsync) {
			let action = this
			let fated = user.statusEffects.find(status => status.slug == "fated_pain")

			env.GENERIC_ACTIONS.teamWave({
				team: user.enemyTeam,
				exec: (actor, i) => {
					env.GENERIC_ACTIONS.singleTarget({
						action: action, 
						user, 
						target: actor,
						hitSfx: { name: 'talksignal' },
						critSfx: { name: 'chomp', rate: 0.45 },
						hitExec: ({target})=> {
							let rand = Math.random()
							if(rand < 0.3) {
								addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 
								
							} else if(rand < 0.6) {
								addStatus({target, origin: user, status: "puncture", origin: user, length: 1}); 

							} else {
								addStatus({target, origin: user, status: "vulnerable", origin: user, length: 2}); 
							}
						},
						critExec: ({target}) => {
							let rand = Math.random()
							
							if(rand < 0.3) {
								addStatus({target, origin: user, status: "fear", origin: user, length: 2}); 
								
							} else if(rand < 0.6) {
								addStatus({target, origin: user, status: "puncture", origin: user, length: 1}); 

							} else {
								addStatus({target, origin: user, status: "weakened", origin: user, length: 1}); 
							}
							if(user.team.name == "ally") {
								let rand1 = Math.random()
								let pain_peasant = ['player_pain_husk','player_pain_husk','player_pain_husk','player_pain_husk','player_pain_husk_bone','player_pain_husk_claws','player_pain_husk_eyes','player_pain_husk_ichor','player_pain_husk_light']
								let newAllySlug = pain_peasant.sample()
								if (rand1 < 1) {
									user.lastSide = !user.lastSide
									if(user.team.members.filter(m=>m.slug.includes('pain')).length < (fated ? fated.power + 4 : 4)) {
										midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
									}
								}
							}
							else {
								let rand1 = Math.random()
								let pain_peasant_enemy = ['pain_husk','pain_husk','pain_husk','pain_husk','pain_husk_bone','pain_husk_claws','pain_husk_eyes','pain_husk_ichor','pain_husk_light']
								let newEnemySlug = pain_peasant_enemy.sample()
								if (rand1 < 1) {
									user.lastSide = !user.lastSide
									if(user.team.members.filter(m=>m.slug.includes('pain')).length < (fated ? fated.power + 4 : 4)) {
										midCombatEnemyAdd(newEnemySlug, user.lastSide ? "left" : "right")
									}
								}
							}
							combatHit(actor, {amt: 1, crit: 0, autohit: true, origin: user});
						}
					})
				},
				advanceAfterExec: true, beingUsedAsync, user,
			})
		}
	}
		//pain primary aug
	env.ACTIONS.special_playershelf_annihilate_mega = {
        slug: "special_playershelf_annihilate_mega",
        name: "Greater Annihilation",
        type: 'special+target',
        desc: "'utilize long limbs to eviscerate a target';'offer user responsive choice'",
        anim: "wobble", //hehe it's da webseries :3
        help: "CHOOSE::100% -4HP ::OR:: 50% -4HP (SELF:: -3HP), 50%C x2 +4T:PUNCTURE +3T:OPEN WOUND +2T:WEAKENED +1T:STUN (SELF:: -3HP)",
        usage: {
            act: "%USER LUNGES AT %TARGET",
            crit: "%TARGET IS UNRECOGNIZEABLE",
            hit: "%TARGET IS BRUTALLY STABBED",
            miss: "%TARGET ESCAPED BY A HAIR"
        },
        accuracy: 1,
        crit: 0,
        noRepeat: true,
        exec: function(user, target) {
			removeStatus(user, "windup")
            let action = this

            //summon a div that lets the player click guaranteed or chance <--- we are modifying this to let the player choose between a high damage guarenteed strike or a self-damaging strike that can crit
            actionChoice({
                user: user,
                action: action,
                choiceText: `${user.name} lunges at ${target.name}...`,
                options: [
                    {text: "Guarantee strike", definition: "NOTE::'100% -4HP'"},
                    {text: "Go for the kill", definition: "NOTE::'50% -4HP (SELF:: -3HP), 50%C x2 +4T:PUNCTURE +3T:OPEN WOUND +2T:WEAKENED +1T:STUN (SELF:: -3HP)'"},
                ],
                choiceCallback: (c) => {
                    //reap the consequences
                        
                    var hit
                    switch(c) {
                        case "c0":
                            hit = combatHit(target, {amt: 4, acc: 1.5, crit: 0, origin: user});
                            break;
                        case "c1":
                            hit = combatHit(target, {amt: 4, acc: 0.5, crit: 0.5, origin: user})
							combatHit(user, {amt: 3, autohit: true, canCrit: false, redirectable: false, origin: user})
                            break
                    }

                    actionMessage(user, action, target, hit)
                    switch(hit) {
                        case "crit":                                
                            playCombatCrit()
                            addStatus({target: target, origin: user, status: "stun", length: 1})
                            addStatus({target: target, origin: user, status: "puncture", length: 4, noReact: true})
							addStatus({target: target, origin: user, status: "open_wound", length: 3, noReact: true})
							addStatus({target: target, origin: user, status: "weakened", length: 2, noReact: true})
							combatHit(user, {amt: 3, autohit: true, canCrit: false, redirectable: false, origin: user})
                            removeStatus(target, "windup")
                            break
                        case true:
                            reactDialogue(target, 'receive_crit')
                            play("stab", 0.65)
                            break;
                        case false:
                            reactDialogue(target, 'evade')
                            play("miss", 0.65)
                            break;
                    }

                    setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE);
                }
            })
        }
    },
		//pain utility aug 1
	env.ACTIONS.raise_sacrifice = {
		slug: "raise_sacrifice",
		name: "Meiosis",
		desc: "'split off own flesh to create ally'",
		anim: "skitter",
		type: 'special+nomimic+summon',
		help: "SELF:: -2HP +1T:PUNCTURE + SUMMON +1 HUSK (MAX:4)",
		itemAction: true, //we have to lie here so that imps can't use this action
		advanceAfterExec: true,
		usage: {
			act: "%USER CREATES A HUSK FROM THEIR FLESH"
		},
		exec: (user, beingUsedAsync) => {
			let fated = user.statusEffects.find(status => status.slug == "fated_pain")
			play('stab', 0.8)
			combatHit(user, {amt: 2, autohit: true, redirectable: false, runEvents: false, origin: user})
			addStatus({target: user, status: "puncture", length: 1});
			let rand1 = Math.random()
			let pain_peasant = ['player_pain_husk','player_pain_husk','player_pain_husk','player_pain_husk_bone','player_pain_husk_claws','player_pain_husk_eyes','player_pain_husk_ichor','player_pain_husk_light']
			let newAllySlug = pain_peasant.sample()
			if (rand1 < 1) {
				user.lastSide = !user.lastSide
				if(user.team.members.filter(m=>m.slug.includes('pain')).length < (fated ? fated.power + 4 : 4)) {
					midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
				}
			}
			setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE * 0.2);
		}
	},
		//pain utility aug 2
	env.ACTIONS.raise_sacrifice_mega = {
		slug: "raise_sacrifice_mega",
		name: "Mitosis",
		desc: "'split off own flesh to create ally';'tendency to create stronger husk';'hurts'",
		anim: "skitter",
		type: 'special+nomimic+summon',
		help: "SELF:: -3HP +2T:PUNCTURE + SUMMON +1 HUSK (MAX:4)",
		itemAction: true, //we have to lie here so that imps can't use this action
		advanceAfterExec: true,
		usage: {
			act: "%USER CREATES A HUSK FROM THEIR FLESH"
		},
		exec: (user, beingUsedAsync) => {
			let fated = user.statusEffects.find(status => status.slug == "fated_pain")
			play('stab', 0.6)
			combatHit(user, {amt: 3, autohit: true, redirectable: false, runEvents: false, origin: user})
			addStatus({target: user, status: "puncture", length: 2});
			let rand1 = Math.random()
			let pain_royal = ['player_pain_husk_bone','player_pain_husk_claws','player_pain_husk_eyes','player_pain_husk_ichor','player_pain_husk_light','player_pain_husk_flesh','player_pain_husk_dull','player_pain_husk_spirestone','player_pain_husk_hands','player_pain_husk_flesh','player_pain_husk_dull','player_pain_husk_spirestone','player_pain_husk_hands','player_pain_husk_bone','player_pain_husk_claws','player_pain_husk_eyes','player_pain_husk_ichor','player_pain_husk_light','player_pain_husk_flesh','player_pain_husk_dull','player_pain_husk_spirestone','player_pain_husk_hands','player_pain_husk_flesh','player_pain_husk_dull','player_pain_husk_spirestone','player_pain_husk_hands','player_pain_husk_akizet','player_pain_husk_gakvu','player_pain_husk_tozik','player_pain_husk_miltza','player_pain_husk_bozko','player_pain_husk_cavik','player_pain_husk_ikgolem','player_pain_husk_kazki']
			let newAllySlug = pain_royal.sample()
			if (rand1 < 1) {
				user.lastSide = !user.lastSide
				if(user.team.members.filter(m=>m.slug.includes('pain')).length < (fated ? fated.power + 4 : 4)) {
					midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
				}
			}
			setTimeout(()=>advanceTurn(user), env.ADVANCE_RATE * 0.3);
		}
	},
		//pain secondary aug
	env.ACTIONS.swarm = {
		slug: "swarm",
		name: "Swarm",
		type: 'summon+nomimic+target',
		desc: "'attempt to enter target body';'assume direct control'",
		help: "90% -1HP +1T:PUNCTURE, 5%C +2T:FEAR +1T:STUN +HOST BODY +HUSKED\nSUMMON::+1 HUSKED ALLY (MAX:1)",
		anim: "basic-attack",
		accuracy: 0.9,
		crit: 0.05,
		amt: 1,
		itemAction: true, //we have to lie here so that imps can't use this action
		usage: {
			act: "%USER SURROUNDS %TARGET",
			crit: "%TARGET IS HUSKED",
			hit: "%TARGET BLEEDS SLUDGY CORRU",
			miss: "%TARGET ESCAPES"
		},
		exec: function(user, target) {
			let fated = user.statusEffects.find(status => status.slug == "fated_pain")
			return env.GENERIC_ACTIONS.singleTarget({
				action: this,
				user,
				target,
				hitStatus: {
					name: 'puncture',
					length: 1
				},
				hitSfx: {
					name: 'stab',
					rate: 1.5
				},
				critSfx: {
					name: 'chomp',
					rate: 0.5
				},
				critExec: ({target}) => {
					addStatus({target: target, origin: user, status: "fear", length: 2})
					addStatus({target: target, origin: user, status: "stun", length: 1})
					if(target.statusImmunities && target.statusImmunities.includes("stun")) return //if the target is a boss enemy, don't husk them
					if(user.team.members.filter(m=>m.slug.includes('husked')).length > (fated ? fated.power + 1 : 1)) return //if the husked ally limit has been reached, don't apply the husking statuses
					if(target.slug.includes('falsecritta')) return //if the target is an antishell, don't bother
					if(target.slug.includes('gauntlet')) return //if the target is a doz gauntlet, don't bother
					addStatus({target: target, origin: user, status: "puppet_mega", length: 1})
					addStatus({target: target, origin: user, status: "puppet_conjoined", length: 1})
					if(target.originalSlug) { slugInsert = target.originalSlug } //grab target slug
					else slugInsert = target.slug //ok turns out if there's only one actor on the team they don't get an original slug
					let newAllySlug = slugInsert+ '_husked' //set newAllySlug to the slug + husked
					
					let rand = Math.random()
					if (rand < 1) {
						user.lastSide = !user.lastSide
						if(user.team.members.filter(m=>m.slug.includes('husked')).length < (fated ? fated.power + 1 : 1)) { //summon corresponding combat actor
							midCombatAllyAdd(newAllySlug, user.lastSide ? "left" : "right")
						}
					}
				}
			})
		}
	},
	
	//trusive actions
		//trusive primary (so that it doesn't conflict with surge and wild surge)
	env.ACTIONS.trusive_smash = {
        slug: "trusive_smash",
        name: "Unnatural Strike",
        type: 'target',
        desc: "'focused, deadly attack upon one target';'immense physical trauma'",
        anim: "basic-attack",
        help: "100% -4HP, 40% X2 +1T:STUN +2T:OPEN WOUND +3T:VULNERABLE +CRITICAL FLAW",
        usage: {
            act: "%USER CHARGES %TARGET",
            crit: "%TARGET IS LEFT REELING",
            hit: "%TARGET IS STRUCK",
            miss: "%TARGET EVADES"
        },
        accuracy: 1,
        crit: 0.4,
        amt: 4,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'hit',
                    rate: 0.8
                },
                critExec: ({target})=> {
                    addStatus({target, origin: user, status: "stun", length: 1})
                    addStatus({target, origin: user, status: "open_wound", length: 2, noReact: true})
                    addStatus({target, origin: user, status: "vulnerable", length: 3, noReact: true})
                    addStatus({target, origin: user, status: "critical_flaw", length: 1, noReact: true})
                }
            })
        },
		disableIf: (user)=> {if(user.windupActions.includes("trusive_splitter")) return "PROHIBITED BY INCOHERENCE"}
    },
		//frenzy action for secondary so it doesn't ONLY murderize you
	env.ACTIONS.frenzy_heal = {
        slug: "frenzy_heal",
        name: "Healing Frenzy",
        type: 'target',
        desc: "'puncture vital cystic component';'may inspire additional stabbing';'stop regen'\n'best paired with focus and vulnerability'",
        anim: "basic-attack",
        help: "70% -1HP +2T:PUNCTURE -REGEN, 10%C USE THIS ACTION AGAIN (SELF:: +1HP, -PUNCTURE)",
        usage: {
            act: "%USER STABS %TARGET",
            crit: "%USER JUST KEEPS GOING",
            hit: "%TARGET BLEEDS SLUDGY CORRU",
            miss: "%TARGET EVADES"
        },
        accuracy: 0.7,
        crit: 0.1,
        amt: 1,
        exec: function(user, target) {
            let action = this
            return env.GENERIC_ACTIONS.singleTarget({
                action, 
                user, 
                target,
                hitSfx: {
                    name: 'stab',
                    rate: 1
                },
                critSfx: {
                    name: 'stab',
                    rate: 1.75
                },

                hitExec: ({target}) => {
                    addStatus({target, status: "puncture", length: 2});
                },

                critExec: ({target})=> {
                    if(target.hp > 0 && target.state != "lastStand") {
                        env.setTimeout(()=>{
                            useAction(user, this, target, {beingUsedAsync: true, reason: "frenzy_heal"})
							combatHit(user, {amt: -1, autohit: true, origin: user, beneficial: true})
							removeStatus(user, "puncture")
                        }, 400)
                    }
                }
            })
        }
    },
	
		//trusive secondary
    env.ACTIONS.special_mass_frenzy = {
        slug: "special_mass_frenzy",
        name: "Wound Thoughtspace",
        type: 'special',
        desc: "'blind frenzy across battlefield';'indiscriminate damage'",
        help: "ALL::70% -1HP +2T:PUNCTURE -REGEN, 10%C x2 CONTINUE ATTACKING TARGET + (SELF:: +1HP, -PUNCTURE)",
        anim: "wobble",
        autohit: true,
        accuracy: 100,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "THE THOUGHTSPACE GROWS VIOLENT", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
						hitSfx: {
							name: "stab",
							rate: 1
						},
						critSfx: {
							name: "stab",
							rate: 1.75
						},
                        genExec: ({target}) => {
                            useAction(user, env.ACTIONS.frenzy_heal, target, {beingUsedAsync: true, reason: "mass_frenzy"})
                        }
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
		//trusive utility
    env.ACTIONS.special_intrusive_alt = {
        slug: "special_intrusive_alt",
        name: "Gamble",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        possibleSpawns: ["intrusive_blocker_weak", "intrusive_archival_weak", "intrusive_bishopfreak_weak", "intrusive_statusoid_weak" ],
		possibleAllies: ["intrusive_blocker_weak_ally", "intrusive_archival_weak_ally", "intrusive_bishopfreak_weak_ally", "intrusive_statusoid_weak_ally" ],
        possiblePassives: ["light_veilkdrop", "light_humorist", "eyes_dancer", "bone_adaptive", "claws_chitin", "light_glee", "eyes_hypercritical", "malware_drill", "malware_rot", "weak_point"],
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
						<li class="d5">5</li>
						<li class="d6">6</li>
						<li class="d7">7</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. life up</li>
						<li class="d2">2. main up</li>
						<li class="d3">3. unlucky</li>
						<li class="d4">4. bomb</li>
						<li class="d5">5. unlucky</li>
						<li class="d6">6. change</li>
						<li class="d7">7. lucky</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 8)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.5)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // life up - gives 5HP and 5 turns of regen to allies
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: -5,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 5
                                    },
									genExec: ()=> {
										combatHit(actor, {amt: -5, origin: user, autohit: true, beneficial: true}); //for reasons unclear to me, life up can't heal on its own so we have to do this shenaniganry
									}
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 2: // main up - team gets focus and empowered but no empowered if you're an enemy :P
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        if(target.team.name == "ally") addStatus({target, status: "empowered", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 3: // spawns enemies
                    case 5: // unlucky
                        user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"
                        play('dull', 0.8, 1)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatEnemyAdd(this.possibleSpawns.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatEnemyAdd(this.possibleSpawns.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 4: // bombs - spawns a bastard bomb
                        user.chancePanel.result.innerHTML = "BOOM :=)"
                        play('dull', 0.8, 1)

                        if(user.enemyTeam.members.length < 12) {
                            midCombatEnemyAdd("intrusive_bomblet_weak", 'right')
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 6: // change - gives everyone a special passive that's overridden by each change roll
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talkfairy',
                                        rate: 0.5
                                    },
                                    genExec: ({target}) => {
                                        let currentStatuses = target.statusEffects.map(status => status.slug)
                                        let possiblePassives = this.possiblePassives.filter(statusName => !currentStatuses.includes(statusName))

                                        console.log("in with", target, possiblePassives)

                                        //special ones can happen on certain creatures
                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak")
                                        ) possiblePassives.push("visionary")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak") ||
                                            target.slug.includes("intrusive_statusoid")
                                        ) possiblePassives.push("active_support")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak") ||
                                            target.slug.includes("intrusive_statusoid")
                                        ) possiblePassives.push("impatient")
                                        
                                        // remove passive beforehand if one exists
                                        if(target.intrusivePassive) { removeStatus(target, target.intrusivePassive, {forceRemoveStatus: true}) }
                                        target.intrusivePassive = possiblePassives.sample()
                                        addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break
					
					case 7: // lucky - summon intrusive ally
						user.chancePanel.result.innerHTML = "GOOD TIM!::E NO,W!"
                        play('dull', 0.8, 1)
                             
                        if(user.team.members.length < 15) {
                            if(user.lastSide) {
                                midCombatAllyAdd(this.possibleAllies.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatAllyAdd(this.possibleAllies.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 6000)
        }
    }
	
		//trusive primary aug
	env.ACTIONS.trusive_splitter = {
        slug: "trusive_splitter",
        name: "Thoughtsplitter",
		verb: "thoughtsplit",
        type: 'target',
        desc: "'incoherence enabled cutting beam';'immense physical trauma'",
        anim: "basic-attack",
        help: "AUTOHIT -4HP +2T:OPEN WOUND +3T:VULNERABLE +CRITICAL FLAW, 5% x2 +WEAK POINT",
        usage: {
            act: "%USER BLASTS %TARGET",
            crit: "%TARGET IS IS ANNIHILATED",
            hit: "%TARGET IS SEARED",
            miss: "%TARGET EVADES"
        },
        autohit: true,
        crit: 0.05,
        amt: 4,
        exec: function(user, target) {
            removeStatus(user, "windup")
            return env.GENERIC_ACTIONS.singleTarget({
                action: this, 
                user, 
                target,
                hitSfx: {
                    name: 'dull',
                    rate: 0.5
                },
				critSfx: {
					name: 'stab',
					rate: 0.4
				},
				critStatus: {
					name: "weak_point",
					length: 1
				},
                hitExec: ({target})=> {
                    addStatus({target, origin: user, status: "open_wound", length: 2, noReact: true})
                    addStatus({target, origin: user, status: "vulnerable", length: 3, noReact: true})
                    addStatus({target, origin: user, status: "critical_flaw", length: 1, noReact: true})
                }
            })
        }
    }, 
		//trusive secondary aug
	env.ACTIONS.special_mass_bite = {
        slug: "special_mass_bite",
        name: "Consume Thoughtspace",
        type: 'special',
        desc: "'affect all thoughtforms with incoherence';'indiscriminate damage'",
        help: "ALL::AUTOHIT -2HP +3T:ROT, 10%C x2 +3T:ROT + (SELF::+2HP, -ROT)",
        anim: "wobble",
        autohit: true,
		amt: 2,
        accuracy: 100,
        crit: 0.1,
        exec: function(user, target, beingUsedAsync) {
            actionMessage(user, "THE THOUGHTSPACE GROWS WEAK", target);
            
            if(env.rpg.classList.contains("bastard")) {                
                if(user.team.name == "ally") {
                    env.rpg.classList.add('incoherentbg')
                    content.classList.add('painprep', 'painfade', 'painhalf')
                    setTimeout(()=>{content.classList.add('painmode')}, 100)
                    setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                    setTimeout(()=>{content.classList.remove('painprep', 'painfade', 'painhalf')}, 5000)

                    setTimeout(()=>{env.rpg.classList.remove('incoherentbg')}, 4000)
                }
            } else {
                ratween(env.bgm, 1, 2000)
                env.rpg.classList.add('incoherentbg')
                content.classList.add('painprep', 'painhalf')
                setTimeout(()=>{content.classList.add('painmode')}, 100)
                setTimeout(()=>{content.classList.remove('painmode')}, 4000)
                setTimeout(()=>{content.classList.remove('painprep', 'painhalf')}, 5000)
            }
            
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                arbitraryActorList: env.rpg.turnOrder,
                exec: (actor, i) => {
                    env.GENERIC_ACTIONS.singleTarget({
                        action, 
                        user, 
                        target: actor,
                        autohit: true,
                        hitSfx: {
                            name: 'chomp',
                            rate: 1
                        },
						critSfx: {
							name: 'chomp',
							rate: 0.6
						},
                        genExec: ({target}) => {
                            addStatus({target: actor, origin: user, status: "rot", length: 3});
                        },
						critExec: ({target, user}) => {
							addStatus({target: actor, origin: user, status: "rot", length: 3});
							combatHit(user, {amt: -2, autohit: true, origin: user, beneficial: true})
							removeStatus(user, "rot")
						}
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    }
	
		//that's right babey it's time for tarot::TWO !!!!!!!!!!!!!!!!!!
			//intrude wheel actions start here
	env.ACTIONS.special_intrusive_life = {
        slug: "special_intrusive_life",
        name: "Intrude::LIFE",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. life up</li>
						<li class="d2">2. life up</li>
						<li class="d3">3. life up</li>
						<li class="d4">4. life up</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // life up - 3HP and +3T:REGEN for allies
                        user.chancePanel.result.innerHTML = "LUCKY!"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 3,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.7
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 3
                                    },
									genExec: ()=> {
										combatHit(actor, {amt: -3, origin: user, autohit: true, beneficial: true});
									},
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 2: // life up - 5HP and +5T:REGEN for allies
					case 3:
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 5,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 5
                                    },
									genExec: ()=> {
										combatHit(actor, {amt: -5, origin: user, autohit: true, beneficial: true});
									},
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 4: // life up - +10HP, +10T:REGEN, -ROT for allies
                        user.chancePanel.result.innerHTML = "LUCKY LUCKY!!"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 10,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.35
                                    },
                                    hitStatus: {
                                        name: 'regen',
                                        length: 10
                                    },
									genExec: ()=> {
										combatHit(actor, {amt: -10, origin: user, autohit: true, beneficial: true});
										removeStatus(actor, "rot")
									},
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	
	env.ACTIONS.special_intrusive_main = {
        slug: "special_intrusive_main",
        name: "Intrude::MAIN",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. main up</li>
						<li class="d2">2. main up</li>
						<li class="d3">3. main up</li>
						<li class="d4">4. main up</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // main up - +2T:FOCUSED and +1T:EVASION for allies
                        user.chancePanel.result.innerHTML = "LUCKY!"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.7
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        if(target.team.name == "ally") addStatus({target, status: "evasion", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 2: // main up - +2T:FOCUSED and +1T:EMPOWERED for allies
					case 3:
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 2
                                    },
                                    genExec: ({target}) => {
                                        if(target.team.name == "ally") addStatus({target, status: "empowered", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 4: // main up - +3T:FOCUSED, +2T:EMPOWERED, +SURGE for allies
                        user.chancePanel.result.innerHTML = "LUCKY LUCKY!!"
                        env.GENERIC_ACTIONS.teamWave({
                            team: user.team,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.35
                                    },
                                    hitStatus: {
                                        name: 'focused',
                                        length: 3
                                    },
                                    genExec: ({target}) => {
                                        if(target.team.name == "ally") addStatus({target, status: "empowered", length: 2, noReact: true})
										if(target.team.name == "ally") addStatus({target, status: "surge", length: 1, noReact: true})
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	
	env.ACTIONS.special_intrusive_unlucky = {
        slug: "special_intrusive_unlucky",
        name: "Intrude::UNLUCKY",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
		possibleSpawns: ["intrusive_blocker_weak", "intrusive_archival_weak", "intrusive_bishopfreak_weak", "intrusive_statusoid_weak" ],
		possibleWeakSpawns: ["intrusive_blocker_micro", "intrusive_archival_micro", "intrusive_bishopfreak_micro", "intrusive_statusoid_micro" ],
		possibleMegaSpawns: ["intrusive_blocker_mega", "intrusive_archival_mega", "intrusive_bishopfreak_mega", "intrusive_statusoid_mega" ],
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. unlucky</li>
						<li class="d2">2. unlucky</li>
						<li class="d3">3. unlucky</li>
						<li class="d4">4. unlucky</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // bad time now - summon two microtrusives
                        user.chancePanel.result.innerHTML = "BAD TIM!::E"
                        play('dull', 1, 1.2)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatEnemyAdd(this.possibleWeakSpawns.sample(), 'left')
								midCombatEnemyAdd(this.possibleWeakSpawns.sample(), 'right')
                                user.lastSide = 0
                            } else {
                                midCombatEnemyAdd(this.possibleWeakSpawns.sample(), 'right')
								midCombatEnemyAdd(this.possibleWeakSpawns.sample(), 'left')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_irradiate, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 2: // bad time now - normal trusive summon :P
					case 3:
                        user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"
                        play('dull', 0.8, 1)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatEnemyAdd(this.possibleSpawns.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatEnemyAdd(this.possibleSpawns.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
						
						setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 4: // bad time now - summon 1 megatrusive
                        user.chancePanel.result.innerHTML = "!BAD!! TIM!:!E!! NO,W!!!!"
                        play('dull', 0.6, 0.8)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatEnemyAdd(this.possibleMegaSpawns.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatEnemyAdd(this.possibleMegaSpawns.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_bite, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
						
						setTimeout(()=>advanceTurn(user), 1000)
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	
	env.ACTIONS.special_intrusive_bombs = {
        slug: "special_intrusive_bombs",
        name: "Intrude::BOMBS",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. bomb</li>
						<li class="d2">2. bomb</li>
						<li class="d3">3. bomb</li>
						<li class="d4">4. bomb</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // boom - summon 4 microbstrdbombs
                        user.chancePanel.result.innerHTML = "500 BOMBS!!!!"
                        play('dull', 1, 1.2)

                        if(user.enemyTeam.members.length < 12) {
                            midCombatEnemyAdd("intrusive_bomblet_micro", 'right')
							midCombatEnemyAdd("intrusive_bomblet_micro", 'right')
							midCombatEnemyAdd("intrusive_bomblet_micro", 'left')
							midCombatEnemyAdd("intrusive_bomblet_micro", 'left')
                        } else {
                            useAction(user, env.ACTIONS.special_irradiate, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 2: // boom - normal bstrdbomb :P
					case 3:
                        user.chancePanel.result.innerHTML = "BOOM :=)"
                        play('dull', 0.8, 1)

                        if(user.enemyTeam.members.length < 12) {
                            midCombatEnemyAdd("intrusive_bomblet_weak", 'right')
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 4: // boom - summon DA MEGABSTRDBOMB!!!!!
                        user.chancePanel.result.innerHTML = "BOOM!! >:=)"
                        play('dull', 0.6, 0.8)

                        if(user.enemyTeam.members.length < 12) {
                            midCombatEnemyAdd("intrusive_bomblet_mega", 'left')
                        } else {
                            useAction(user, env.ACTIONS.special_mass_bite, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	
	env.ACTIONS.special_intrusive_thinkagain = {
        slug: "special_intrusive_thinkagain",
        name: "Intrude::THINK AGAIN",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
		possiblePassives: ["light_veilkdrop", "light_humorist", "eyes_dancer", "bone_adaptive", "claws_chitin", "light_glee", "eyes_hypercritical", "malware_drill", "malware_rot", "weak_point"],
        possibleActionPassives: ["impatient", "retaliation", "active_support", "visionary", "flesh_menace", "dull_pragmatist", "spirestone_parry", "hands_penance", "metal_autonomous", "pain_rampage"],
		usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. change</li>
						<li class="d2">2. change</li>
						<li class="d3">3. change</li>
						<li class="d4">4. change</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // think again - re-use intrude
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        useAction(user, env.ACTIONS.special_intrusive_mega, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break

                    case 2: // think again - normal change :P
					case 3:
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talkfairy',
                                        rate: 0.5
                                    },
                                    genExec: ({target}) => {
                                        let currentStatuses = target.statusEffects.map(status => status.slug)
                                        let possiblePassives = this.possiblePassives.filter(statusName => !currentStatuses.includes(statusName))

                                        console.log("in with", target, possiblePassives)

                                        //special ones can happen on certain creatures
                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak")
                                        ) possiblePassives.push("visionary")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak") ||
                                            target.slug.includes("intrusive_statusoid")
                                        ) possiblePassives.push("active_support")

                                        if(
                                            !target.slug.includes("intrusive") ||
                                            target.slug.includes("intrusive_bishopfreak") ||
                                            target.slug.includes("intrusive_statusoid")
                                        ) possiblePassives.push("impatient")
                                        
                                        // remove passive beforehand if one exists
                                        if(target.intrusivePassive) { removeStatus(target, target.intrusivePassive, {forceRemoveStatus: true}) }
                                        target.intrusivePassive = possiblePassives.sample()
                                        addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break

                    case 4: // think again - action impulses for everyone!!!! (these ones don't get replaced)
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        env.GENERIC_ACTIONS.teamWave({
                            arbitraryActorList: env.rpg.turnOrder,
                            exec: (actor, i) => {
                                env.GENERIC_ACTIONS.singleTarget({
                                    beneficial: true,
                                    autohit: true,
                                    action,
                                    amt: 0,
                                    canCrit: false,
                                    user, 
                                    target: actor,
                                    hitSfx: {
                                        name: 'talklaugh',
                                        rate: 0.5
                                    },
                                    genExec: ({target}) => {
                                        let currentStatuses = target.statusEffects.map(status => status.slug)
                                        let possiblePassives = this.possibleActionPassives.filter(statusName => !currentStatuses.includes(statusName))

                                        console.log("in with", target, possiblePassives)

                                        target.intrusivePassive = possiblePassives.sample()
                                        addStatus({target, status: target.intrusivePassive, length: 1, noReact: true})                                        
                                    }
                                })
                            },
                            advanceAfterExec: true, beingUsedAsync, user,
                        })
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	//mass restore doesn't exist anymore !! oops !!
	env.ACTIONS.special_restore_allies = {
        slug: "special_restore_allies",
        name: "Mass Restore",
        type: 'special',
        desc: "'project broad reparative applicators';'restore allies to fighting condition'",
        help: "ALLIES::+3HP +2T:REGEN -PUNCTURE -DOWN",
        anim: "heal",
        autohit: true,
        amt: -3,
        usage: {
            act: "%USER DEPLOYS A SHIMMERING METALLIC MIST"
        },
        exec: function(user, target, beingUsedAsync) {
            let action = this
            env.GENERIC_ACTIONS.teamWave({
                team: user.team,
                exec: (actor, i) => {
                    if(actor.slug == user.slug) return
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: true,
                        action, 
                        user, 
                        target,
                        hitStatus: {name: 'regen', length: 2},
                        hitSfx: {
                            name: 'mend',
                            rate: 1
                        },
                        genExec: ({target})=>{
                            if(target.state == "dead") {
                                target.hp = 3
                                combatRevive(target)
                                reactDialogue(target, 'receive_rez')
                                addStatus({target: target, origin: user, status: "evasion", length: 2, noReact: true}); 
                            }
                        }                
                    })
                },
                advanceAfterExec: true, beingUsedAsync, user,
            })
        }
    },
	
	env.ACTIONS.special_intrusive_lucky = {
        slug: "special_intrusive_lucky",
        name: "Intrude::LUCKY",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
		possibleAllies: ["intrusive_blocker_weak_ally", "intrusive_archival_weak_ally", "intrusive_bishopfreak_weak_ally", "intrusive_statusoid_weak_ally" ],
		possibleWeakAllies: ["intrusive_blocker_micro_ally", "intrusive_archival_micro_ally", "intrusive_bishopfreak_micro_ally", "intrusive_statusoid_micro_ally" ],
		possibleMegaAllies: ["intrusive_blocker_mega_ally", "intrusive_archival_mega_ally", "intrusive_bishopfreak_mega_ally", "intrusive_statusoid_mega_ally" ],
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. lucky</li>
						<li class="d2">2. lucky</li>
						<li class="d3">3. lucky</li>
						<li class="d4">4. lucky</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 5)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.6)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // good time now - summon two microtrusive allies
                        user.chancePanel.result.innerHTML = "GOOD TIM!::E"
                        play('dull', 1, 1.2)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatAllyAdd(this.possibleWeakAllies.sample(), 'left')
								midCombatAllyAdd(this.possibleWeakAllies.sample(), 'right')
                                user.lastSide = 0
                            } else {
                                midCombatAllyAdd(this.possibleWeakAllies.sample(), 'right')
								midCombatAllyAdd(this.possibleWeakAllies.sample(), 'left')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_irradiate, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
            
                        setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 2: // good time now - normal trusive summon (ally edition) :P
					case 3:
                        user.chancePanel.result.innerHTML = "GOOD TIM!::E NO,W!"
                        play('dull', 0.8, 1)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatAllyAdd(this.possibleAllies.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatAllyAdd(this.possibleAllies.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_mass_destabilize, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
						
						setTimeout(()=>advanceTurn(user), 1000)
                    break

                    case 4: // good time now - summon 1 megatrusive ally
                        user.chancePanel.result.innerHTML = "!GOOD!! TIM!:!E!! NO,W!!!!"
                        play('dull', 0.6, 0.8)
                             
                        if(user.enemyTeam.members.length < 12) {
                            if(user.lastSide) {
                                midCombatAllyAdd(this.possibleMegaAllies.sample(), 'left')
                                user.lastSide = 0
                            } else {
                                midCombatAllyAdd(this.possibleMegaAllies.sample(), 'right')
                                user.lastSide = 1
                            }
                        } else {
                            useAction(user, env.ACTIONS.special_restore_allies, user, {triggerActionUseEvent: false, beingUsedAsync: true})
                        }
						
						setTimeout(()=>advanceTurn(user), 1000)
                    break
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 4500)
        }
    },
	
		//trusive utility aug
    env.ACTIONS.special_intrusive_mega = {
        slug: "special_intrusive_mega",
        name: "Intrude",
        type: 'special+nomimic',
        desc: "'â«§âª¶ã¥¥ã³'",
        help: "SSP IN  THE WHEE L LL LL",
        anim: "",
		itemAction: true, //lying here so imps can't use this because could you fucking imagine
        autohit: true,
        crit: 0,
        usage: {
            act: "A GRIM GAMBLE IS MADE"
        },
        noRepeat: true,
        exec: function(user, target, beingUsedAsync) {
			let actor = user

			env.rpg.insertAdjacentHTML('beforeend', `
			<figure id="chancepanel" class="hidden" for="${actor.slug}">
				<img src="/img/sprites/flantrusive/panelbase.gif">
				<div class="wheel">
					<ul>
						<li class="d1">1</li>
						<li class="d2">2</li>
						<li class="d3">3</li>
						<li class="d4">4</li>
						<li class="d5">5</li>
						<li class="d6">6</li>
						<li class="d7">7</li>
					</ul>
				</div>
				<div class="display">
					<ol>
						<li class="d1">1. life up</li>
						<li class="d2">2. main up</li>
						<li class="d3">3. unlucky</li>
						<li class="d4">4. bomb</li>
						<li class="d5">5. unlucky</li>
						<li class="d6">6. change</li>
						<li class="d7">7. lucky</li>
					</ol>
				</div>
				<div class="result">
					<div>
						<span></span>
					</div>
				</div>
			</figure>`)
		
			actor.chancePanel = env.rpg.querySelector(`#chancepanel[for="${actor.slug}"]`)
			actor.chancePanel.result = actor.chancePanel.querySelector(".result span")
			actor.chancePanel.spin = (state) => { 
				actor.chancePanel.removeAttribute("chosen")
				actor.chancePanel.classList.toggle("spinning", state) 
				actor.chancePanel.result.innerHTML = "???"
			}
		
			actor.chancePanel.stopAndResult = () => { 
				let result = rand(1, 8)
				actor.chancePanel.spin(false)
				actor.chancePanel.setAttribute("chosen", result)
		
				return result
			}
			
            if(!user.chancePanel) throw 'ok intrusive spawned wrong';
            let action = this

            user.chancePanel.classList.add("active")
            user.chancePanel.classList.remove("hidden")
            user.chancePanel.spin(true)
            play("talkfairy", 0.4)
            let result

            setTimeout(()=>{
                result = user.chancePanel.stopAndResult()
                playCombatCrit()
            }, 2000)

            setTimeout(()=>{
                switch(result) {
                    case 1: // life up - use intrude::life action
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        useAction(user, env.ACTIONS.special_intrusive_life, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break

                    case 2: // main up - use intrude::main action
                        user.chancePanel.result.innerHTML = "LUCKY! CHA CHA"
                        useAction(user, env.ACTIONS.special_intrusive_main, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break

                    case 3: // use intrude::unlucky action
                    case 5: // unlucky
                        user.chancePanel.result.innerHTML = "BAD TIM!::E NO,W!"
                        useAction(user, env.ACTIONS.special_intrusive_unlucky, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break

                    case 4: // bombs - use intrude::bombs action
                        user.chancePanel.result.innerHTML = "BOOM :=)"
                        useAction(user, env.ACTIONS.special_intrusive_bombs, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break

                    case 6: // change - use intrude::think again action
                        user.chancePanel.result.innerHTML = "THINK AGAIN"
                        useAction(user, env.ACTIONS.special_intrusive_thinkagain, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                    break
					
					case 7: // lucky - use intrude::lucky action
						user.chancePanel.result.innerHTML = "GOOD TIM!::E NO,W!"
                        useAction(user, env.ACTIONS.special_intrusive_lucky, user, {triggerActionUseEvent: false, beingUsedAsync: false})
                }
            }, 3000)

            setTimeout(()=>user.chancePanel.classList.remove("active"), 15000)
        }
    }

// CUSTOM FUNCTIONS
function midCombatAllyAdd(actorSpecifier, side = "right") {
    if(!env.rpg.active) return false;
    
    let actor = initializeActor(actorSpecifier, {team: env.rpg.allyTeam, enemyTeam: env.rpg.enemyTeam, uniqify: true, side})
    
    if(env.rpg.settings.actorPreprocess) env.rpg.settings.actorPreprocess(actor)
    if(actor.base?.events?.onInitialize) actor.base.events.onInitialize(actor)
    if(actor.alterations || env.rpg.settings.teamAlterations?.enemy || env.rpg.settings.teamAlterations?.all ) actor.actions = getAlteredActorActions({member: actor, actor: actor})

    initializeActorUI({actor, team: env.rpg.allyTeam, side, animateIn: false})

    //update the turnorder
    env.rpg.turnOrder = []
    env.rpg.teams.forEach((team, i) => {
        env.rpg.turnOrder = env.rpg.turnOrder.concat(team.members);
    })
	
	//update current actor accordingly
    if(side == "left") {
        env.rpg.currentActorIndex = env.rpg.turnOrder.findIndex((a) => a == env.rpg.currentActor)
    }

    updateStats()
    return actor
}

function midCombatAllyRemove(actor) {
    env.rpg.allyTeam.members = env.rpg.allyTeam.members.filter(a => a.slug != actor.slug)
    delete env.rpg.actors[actor.slug]

    content.querySelectorAll(`#ally-team #${actor.slug}`).forEach(el=>{
        setTimeout(()=>{
            el.remove()
        }, 1000)
    })

    //update the turnorder
    env.rpg.turnOrder = []
    env.rpg.teams.forEach((team, i) => {
        env.rpg.turnOrder = env.rpg.turnOrder.concat(team.members);
    })

    updateStats()
}

if(!env.adenator_toomanyhumors) {addResources(["https://adenator.neocities.org/corrumods/literallyTooManyHumors.js"])} //LITERALLY TOO MANY HUMORS by adenator; adds scroll to humor list

// FUNCTION MODIFICATIONS

env.STATUS_EFFECTS.retaliation.events.GLOBAL_onEvade = function({subject, target, attack, originalEventTarget}) {
                let user = this.status.affecting
                if(
                    !user.enemyTeam.members.includes(subject) || 
                    subject.state == "dead" ||
                    user.state == "dead" ||
                    target == user ||
                    hasStatus(user, "fear")
                ) return;

                let primary = env.ACTIONS[user.actions[0]]
				if (hasStatus(user, "windup")) (primary = env.ACTIONS[user.windupActions[0]])

                setTimeout(()=>{
                    useAction(this.status.affecting, primary, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "retaliation"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `RETALIATE::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} retaliates against ${subject.name} as they miss! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.2)
            }

env.STATUS_EFFECTS.impatient.events.GLOBAL_onAction = function({target, user, hit, action, beingUsedAsync, reason, originalEventTarget}) {
                if(
                    hit != "crit" ||
                    this.status.affecting.state == "dead" || 
                    user == this.status.affecting || 
                    originalEventTarget == this.status.affecting ||
                    this.status.affecting.enemyTeam.members.includes(user) || 
                    this.status.affecting.team.members.includes(target) || 
                    target.state == "dead" ||
                    reason != false ||
                    this.status.turnUsage ||
                    hasStatus(user, "fear")
                ) return;

                this.status.turnUsage = true
                let primary = env.ACTIONS[this.status.affecting.actions[0]]
				if (hasStatus(this.status.affecting, "windup")) (primary = env.ACTIONS[this.status.affecting.windupActions[0]])

                setTimeout(()=>{
                    useAction(this.status.affecting, primary, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "impatient"})
            
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `IMPATIENT::${primary.name.toUpperCase()}`,
                        size: 1.5,
                    })
                
                    readoutAdd({
                        message: `${this.status.affecting.name} joins in ${user.name}'s attack on ${target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.5)
            }

env.STATUS_EFFECTS.active_support.events.GLOBAL_onAction = function({target, user, hit, reason, action, beingUsedAsync, originalEventTarget}) {
                if(
                    hit != "crit" ||
                    this.status.affecting.state == "dead" || 
                    user == this.status.affecting || 
                    originalEventTarget == this.status.affecting ||
                    this.status.affecting.enemyTeam.members.includes(user) || 
                    this.status.affecting.team.members.includes(target) || 
                    target.state == "dead" ||
                    this.status.turnUsage ||
                    !this.status.affecting.actions[1] ||
                    hasStatus(user, "fear")
                ) return;

                this.status.turnUsage = true
                let secondary = env.ACTIONS[this.status.affecting.actions[1]]
				if (hasStatus(this.status.affecting, "windup") && this.status.affecting.windupActions.length > 1) (secondary = env.ACTIONS[this.status.affecting.windupActions[1]])

                setTimeout(()=>{
                    useAction(this.status.affecting, secondary, secondary.beneficial ? user : target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "active_support"})

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `SUPPORT::${secondary.name.toUpperCase()}`,
                        size: 1.5,
                    })
                
                    readoutAdd({
                        message: `${this.status.affecting.name} provides support alongside ${user.name}'s attack on ${target.name}! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail",
                        show: false,
                        sfx: false
                    })
                }, env.ADVANCE_RATE * 0.5)
            }

env.STATUS_EFFECTS.visionary.events.onCrit = function({subject, origin, attack, beneficial}) {
                let user = this.status.affecting
                if(beneficial || user.team.members.includes(subject) || user.state == "dead" || !user.actions[2] || hasStatus(user, "fear")) return;

                let dullUtility = [2, 4, 4, 5, 5, 5, 6, 6, 6, 6]
				
                let utility = env.ACTIONS[user.actions[2]]
				if (user.actions.includes('special_player_dullsummon_low')) {
					utility = env.ACTIONS[user.actions[dullUtility.sample()]]
				}

                
                setTimeout(()=>{
                    sendFloater({
                        target: user,
                        type: "arbitrary",
                        specialClass: "action",
                        arbitraryString: `VISIONARY::${utility.name}`,
                        size: 1.5,
                    })

                    readoutAdd({
                        message: `${user.name} grasps the opportunity! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    
                    useAction(user, utility, subject, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "visionary"})
                }, 500)
            }
			
env.ACTIONS.special_enact.exec = function(user, target) {
            let amt = Math.floor(hasStatus(target, 'evasion'))
            removeStatus(user, "evasion")
			let primary = env.ACTIONS[user.actions[0]]
			if (hasStatus(user, "windup")) (primary = env.ACTIONS[user.windupActions[0]])
            actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

            for (let i = 0; i < amt; i++) {
                env.setTimeout(()=>{
                    let target = env.rpg.enemyTeam.members.filter(t=>t.state != "dead").sample()
                    if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
                }, i * 200)
            }

            env.setTimeout(()=>{
                advanceTurn(user)
            }, (amt * 200) + 500)
        }
		
env.STATUS_EFFECTS.light_laughterhouse.events.onAction = function({user, action, target}) {
                if(action.slug.includes("incoherent_") || action.slug.includes("intrusive") || action.slug == "special_archiveshelf_annihilate" || action.slug == "frenzy_heal" || target.state == "dead" || user.state == "dead" || hasStatus(user, "fear")) return;
                
                if(Math.random() < (0.2 + hasStatus(user, "light_humorist") ? 0.2 : 0)) {
                    reactDialogue(this.status.affecting, 'laugh')

                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "LAUGHTERHOUSE!",
                        size: 1.5
                    })

                    readoutAdd({
                        message: `${user.name} acts again! (<span definition="${processHelp(this.status, {caps: true})}">${this.status.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    setTimeout(()=>useAction(user, action, target, {triggerActionUseEvent: false, beingUsedAsync: true, reason: "laughterhouse"}), 500)
                }
            }

if (env.STATUS_EFFECTS.global_escalation = {
        slug: "global_escalation",
        name: "Escalation",
        passive: true,
        icon: "/img/sprites/daemons/spawner/bee.gif",
        
        events: {

            onCreated: function({statusObj}) {
                if(statusObj.slug != this.status.slug) return;

                if(this.status.affecting.originalSlug != "critta_boss") { //our main quarry doesn't get the HP bonus
                    let power = env.crittaMap.getModQty("global_escalation")
                    let scale = 1 + (power * .5)
                    this.status.affecting.maxhp = Math.floor(scale * this.status.affecting.maxhp)
                    this.status.affecting.hp = Math.floor(scale * this.status.affecting.hp)

                    this.status.help = `+${power * 50}% max HP, ` + this.status.help
                    this.status.affecting.box.querySelector('.passive-global_escalation').setAttribute('definition', `PASSIVE::'${this.status.name}'\nEFFECT::'${this.status.help.toUpperCase()}'`)

                    updateStats({actor: this.status.affecting})
                }
            },

            //turns some statuses into pseudo-new-statuses
            onAddStatus: function({target, statusObj}) {
                let statusChange = false
                let power = env.crittaMap.getModQty("global_escalation")
                switch(statusObj.slug) {
                    case "puncture": // escalation stack increases minimum damage by 1
                    case "rot":
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help.replace("min:1", `min:${power + 1}`)
                        statusChange = true
                    break

                    case "vulnerable": // escalation stack gives this a +50% incoming damage mult
                        statusObj.incomingMult = 0.5 * power
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help + `, +${50 * power}% incoming damage/heal`
                        statusChange = true
                    break

                    case "siphon": // escalation stack increases direct heal by 1
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help.replace("1HP", `${power + 1}HP`)
                        statusChange = true
                    break

                    case "destabilized": // escalation stack increases incoming damage by another 50%
                        statusObj.incomingMult = 1 + (power * 0.5)
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = `+${statusObj.incomingMult * 100}% incoming damage/heal, +100% outgoing`
                        statusChange = true
                    break

                    case "open_wound": // escalation stack increases by +1 flat
                        statusObj.incomingFlat = 1 + power
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help.replace("+1", `+${statusObj.incomingFlat}`)
                        statusChange = true
                    break

                    case "weakened": // escalation stack also reduces hit chance by 20%
                        statusObj.oldName = statusObj.name
                        statusObj.outgoingToHit = power * -.2
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help + `, ${statusObj.outgoingToHit * 100}% hit%`
                        statusChange = true
                    break

                    case "fear": // when afraid, take damage from defeating nearby foes
                        statusObj.oldName = statusObj.name
                        statusObj.name = statusObj.name + '+'.repeat(power)
                        statusObj.help = statusObj.help.replace("utility actions", `utility actions\nwhen an ally dies, take ${power * 10}% of their max HP in damage`)
                        statusChange = true
                    break
                }
            },
			
			
            GLOBAL_onDeath: function({originalEventTarget}) {
                let subject = originalEventTarget
                let user = this.status.affecting

                if(
                    !user.team.members.includes(subject) || 
                    subject.state != "dead" ||
                    !hasStatus(user, "fear")
                ) return;

                let power = env.crittaMap.getModQty("global_escalation")
                let fear = user.statusEffects.find(status => status.slug == "fear")
                let incomingDamage = Math.floor(subject.maxhp * (power * 0.1))

                setTimeout(()=>{
                    playCombatCrit("dull")
                    combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})
                    
                    sendFloater({
                        target: this.status.affecting,
                        type: "arbitrary",
                        arbitraryString: "TERROR!",
                        isGood: false
                    })
                
                    readoutAdd({
                        message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${processHelp(fear, {caps: true})}">${fear.name}</span>)`, 
                        name: "sourceless", 
                        type: "sourceless combat minordetail", 
                        show: false,
                        sfx: false
                    })
                    updateStats({actor: user})
                }, env.ADVANCE_RATE * 0.2)
            },
        },

        help: `most negative statuses have enhanced effect`
    } )
		{ env.STATUS_EFFECTS.global_escalation = {
				slug: "global_escalation",
				name: "Escalation",
				passive: true,
				icon: "/img/sprites/daemons/spawner/bee.gif",
				
				events: {

					onCreated: function({statusObj}) {
						if(statusObj.slug != this.status.slug) return;

						if(this.status.affecting.originalSlug != "critta_boss") { //our main quarry doesn't get the HP bonus
							let power = env.crittaMap.getModQty("global_escalation")
							let scale = 1 + (power * .5)
							this.status.affecting.maxhp = Math.floor(scale * this.status.affecting.maxhp)
							this.status.affecting.hp = Math.floor(scale * this.status.affecting.hp)

							this.status.help = `+${power * 50}% max HP, ` + this.status.help
							this.status.affecting.box.querySelector('.passive-global_escalation').setAttribute('definition', `PASSIVE::'${this.status.name}'\nEFFECT::'${this.status.help.toUpperCase()}'`)

							updateStats({actor: this.status.affecting})
						}
					},

					//turns some statuses into pseudo-new-statuses
					onAddStatus: function({target, statusObj}) {
						let statusChange = false
						let power = env.crittaMap.getModQty("global_escalation")
						switch(statusObj.slug) {
							case "puncture": // escalation stack increases minimum damage by 1
							case "rot":
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help.replace("min:1", `min:${power + 1}`)
								statusChange = true
							break

							case "vulnerable": // escalation stack gives this a +50% incoming damage mult
								statusObj.incomingMult = 0.5 * power
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help + `, +${50 * power}% incoming damage/heal`
								statusChange = true
							break

							case "siphon": // escalation stack increases direct heal by 1
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help.replace("1HP", `${power + 1}HP`)
								statusChange = true
							break
							
							case "siphon_mega": // escalation stack increases direct heal by 2
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help.replace("2HP", `${(power * 2) + 2}HP`)
								statusChange = true
							break

							case "destabilized": // escalation stack increases incoming damage by another 50%
								statusObj.incomingMult = 1 + (power * 0.5)
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = `+${statusObj.incomingMult * 100}% incoming damage/heal, +100% outgoing`
								statusChange = true
							break
							
							case "denatured": // escalation stack increases incoming damage by another 100%
								statusObj.incomingMult = 1 + (power)
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = `+${statusObj.incomingMult * 100}% incoming damage/heal, +200% outgoing`
								statusChange = true
							break

							case "open_wound": // escalation stack increases by +1 flat
								statusObj.incomingFlat = 1 + power
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help.replace("+1", `+${statusObj.incomingFlat}`)
								statusChange = true
							break

							case "weakened": // escalation stack also reduces hit chance by 20%
								statusObj.oldName = statusObj.name
								statusObj.outgoingToHit = power * -.2
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help + `, ${statusObj.outgoingToHit * 100}% hit%`
								statusChange = true
							break

							case "fear": // when afraid, take damage from defeating nearby foes
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.help = statusObj.help.replace("utility actions", `utility actions\nwhen an ally dies, take ${power * 10}% of their max HP in damage`)
								statusChange = true
							break
							
							case "cursed": // escalation stack increases incoming hit% and crit% by 50%
								statusObj.oldName = statusObj.name
								statusObj.name = statusObj.name + '+'.repeat(power)
								statusObj.incomingToHit = 0.75 + (power * 0.5)
								statusObj.incomingToCrit = 2 + (power * 0.5)
								statusObj.help = `+${statusObj.incomingToHit * 100}% incoming hit%, +${statusObj.incomingToCrit * 100}% incoming crit%, -50% outgoing hit%, crit%`
								break
						}
					},

					GLOBAL_onDeath: function({originalEventTarget}) {
						let subject = originalEventTarget
						let user = this.status.affecting

						if(
							!user.team.members.includes(subject) || 
							subject.state != "dead" ||
							!hasStatus(user, "fear")
						) return;

						let power = env.crittaMap.getModQty("global_escalation")
						let fear = user.statusEffects.find(status => status.slug == "fear")
						let incomingDamage = Math.floor(subject.maxhp * (power * 0.1))

						setTimeout(()=>{
							playCombatCrit("dull")
							combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})
							
							sendFloater({
								target: this.status.affecting,
								type: "arbitrary",
								arbitraryString: "TERROR!",
								isGood: false
							})
						
							readoutAdd({
								message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${processHelp(fear, {caps: true})}">${fear.name}</span>)`, 
								name: "sourceless", 
								type: "sourceless combat minordetail", 
								show: false,
								sfx: false
							})
							updateStats({actor: user})
						}, env.ADVANCE_RATE * 0.2)
					},

					GLOBAL_onDeath: function({originalEventTarget}) {
						let subject = originalEventTarget
						let user = this.status.affecting

						if(
							!user.team.members.includes(subject) || 
							subject.state != "dead" ||
							!hasStatus(user, "fear")
						) return;

						let power = env.crittaMap.getModQty("global_escalation")
						let fear = user.statusEffects.find(status => status.slug == "fear")
						let incomingDamage = Math.floor(subject.maxhp * (power * 0.1))

						setTimeout(()=>{
							playCombatCrit("dull")
							combatHit(this.status.affecting, {amt: incomingDamage, autohit: true, redirectable: false, runEvents: false})
							
							sendFloater({
								target: this.status.affecting,
								type: "arbitrary",
								arbitraryString: "TERROR!",
								isGood: false
							})
						
							readoutAdd({
								message: `${user.name} is damaged for ${incomingDamage}HP as ${subject.name} falls! (<span definition="${processHelp(fear, {caps: true})}">${fear.name}</span>)`, 
								name: "sourceless", 
								type: "sourceless combat minordetail", 
								show: false,
								sfx: false
							})
							updateStats({actor: user})
						}, env.ADVANCE_RATE * 0.2)
					},
				},

				help: "most negative statuses have enhanced effect"
			}
		}

env.ACTIONS.special_enact.exec = function(user, target) {
            let amt = Math.floor(hasStatus(target, 'evasion'))
            removeStatus(user, "evasion")
            let primary = env.ACTIONS[user.actions[0]]
			if (hasStatus(user, "windup")) (primary = env.ACTIONS[user.windupActions[0]])
            actionMessage(user, "%USER LAUNCHES THEIR ATTACK", target, 'none', 1000 + (amt * 200))

            for (let i = 0; i < amt; i++) {
                env.setTimeout(()=>{
                    let target = env.rpg.enemyTeam.members.filter(t=>t.state != "dead").sample()
                    if(target) useAction(user, primary, target, {triggerActionUseEvent: i == 0, beingUsedAsync: true, reason: "enact", noUseMessage: true})
                }, i * 200)
            }

            env.setTimeout(()=>{
                advanceTurn(user)
            }, (amt * 200) + 500)
        }

for (const componentName of ["flesh", "dull", "spirestone", "hands", "metal", "pain", "intrusive"]) { // this probably isn't a function but i don't know where else to put it
    const component = env.COMBAT_COMPONENTS[componentName]
	let commerceObject = ({
        type: "humor",
        name: `${component.name.replace("Humor of ", "")}`,
        subject: component,
        value: 1,

        showSellIf: ()=> env.e3a2.mTotals[componentName].available > 0,
        sellExec: ()=>{
            addItem("sfer_cube")
            page.flags.components[componentName]--
            env.e3a2.mTotals = CrittaMenu.getTotals()
            env.commerceNotice = `exchanged ${component.name} for 1 ${env.ITEM_LIST['sfer_cube'].name}`
        },
    })
		env.e3a2.merchant.sellResponses.replies.push({
		name: `${commerceObject.name}::${commerceObject.value}S`,
		destination: "sell",
		hideRead: true,
		showIf: commerceObject.showSellIf,
		class: `commerce-${commerceObject.type}`,
		definition: `NOTE::'exchange for ${commerceObject.value} ${env.ITEM_LIST['sfer_cube'].name}'`,
		exec: ()=> {commerceObject.sellExec(); env.e3a2.mTotals = CrittaMenu.getTotals(); env.e3a2.updateExchangeScreen()}
	})
    env.e3a2.merchant.commerce.push(commerceObject)
}

    //hopefully this fixes the ADD_WINDUP shenanigans
CrittaMenu.generateStatHTMLObject = function(stats, {member, slotName, componentName, editingMember = {}} = {}) {
    let returnStats = {
        core: "",
        in: "",
        out: ""
    }

    let component = false
    if(componentName) component = env.COMBAT_COMPONENTS[componentName][slotName]

    //if a specific component is specified, we can also get a list of perma/auto statuses from it
    if(component?.alterations || member?.components) {
        function addStatusLine(statusObj) {
            returnStats.core += `
                <div class="stat status" 
                    type="status" 
                    pretty="${statusObj.name}"
                    definition="${statusObj.impulse ? `IMPULSE::` : 'PASSIVE::'}'${statusObj.name}'\nEFFECT::${processHelp(statusObj, {caps: true})}"
                    good="${statusObj.beneficial ? String(statusObj.beneficial).replace("true", "good") : "bad"}"
                >+ ${statusObj.name}</div>
            `
        }

        function addActionLine(actionObj, override = "ADD") {
            let effectiveOverride = override
            switch(effectiveOverride) {
                case "ADD": break
                case "ADD_WINDUP": break
                default:
                    effectiveOverride = env.ACTIONS[override].name
            }

            returnStats.core += `
                <div class="stat action" 
                    type="action"
                    override="${effectiveOverride}"
                    definition="${
                        effectiveOverride == "ADD" ? 
                        `NEW ACTION::${actionObj.name.toUpperCase()}` :
                        effectiveOverride == "ADD_WINDUP" ?
                        `NEW WINDUP ACTION::${actionObj.name.toUpperCase()}` :
                        `REPLACE::'${effectiveOverride.toUpperCase()}'::WITH::'${actionObj.name.toUpperCase()}'`
                    }\nCOMMAND::${actionObj.desc}\nSTAT::'${actionObj.help}'"
                >${actionObj.name}</div>
            `
        }

        //for components, we also compile any used augments to display the proper end effect
        if(component?.alterations) {
            let effectiveAlterations = [... component.alterations]

            //get all augments that...
                // that AREN'T in pending remove AND are currently in use
                // are in the pending add
            let effectiveAugments = []
            if(editingMember.augments) effectiveAugments = effectiveAugments.concat(editingMember.augments)
            if(editingMember.augmentChanges) {
                effectiveAugments = effectiveAugments.concat(editingMember.augmentChanges.add)
                effectiveAugments = effectiveAugments.filter(aug => !editingMember.augmentChanges.remove.includes(aug))
            }

            //combine the gathered augments with the effective alterations
            //filter down to just those for this specific component and slot
            for (const augmentSlug of effectiveAugments) {
                const augment = env.ACTOR_AUGMENTS.generic[augmentSlug]
                if(augment.component[0] == slotName && augment.component[1] == componentName) effectiveAlterations = effectiveAlterations.concat(augment.alterations)
            }

            console.log('effective augments are', effectiveAugments, 'alts are', effectiveAlterations)
            for (const alteration of effectiveAlterations) {
                if(alteration[0] == "STATUS") addStatusLine(env.STATUS_EFFECTS[alteration[1]]);
                else switch(alteration[0]) {
                    case "ADD":
                        addActionLine(env.ACTIONS[alteration[1]])
                    break
                    
                    default:
						addActionLine(env.ACTIONS[alteration[1]], alteration[0])
                }
            }

        //otherwise, if a member is specified, we can get their collective statuses that way
        } else if(member?.components || member?.alterations || member?.augments) {
            for (const statusObj of getPassiveStatusesForPartyMember(member)) {
                addStatusLine(statusObj)
            }
        }
    }

    for (const statName in stats) {
        const statInfo = env.STATDATA[statName]

        if(statInfo) {
            var statValue = stats[statName]
            let goodClass = false

            //we show all HP if a member is specified
            if(statName == "maxhp" && member) {
                statValue += env.COMBAT_ACTORS[member.combatActor].maxhp
            }

            if(statValue > 0) {
                switch(statInfo.good) {
                    case "+":
                        goodClass = "good"
                    break
                    case "-":
                        goodClass = "bad"
                    break
                }
            } else if (statValue < 0) {
                switch(statInfo.good) {
                    case "+":
                        goodClass = "bad"
                    break
                    case "-":
                        goodClass = "good"
                    break
                }
            }
            
            let list = "core"
            if(statName.includes("incoming")) list = "in"
            else if(statName.includes("outgoing")) list = "out"

            returnStats[list] += `
                <div class="stat ${statName.includes("outgoing") ? "outgoing" : ""} ${statName.includes("incoming") ? "incoming" : ""}" 
                    type="${statName}" 
                    pretty="${statInfo ? statInfo.display : statName}"
                    definition="INFO::${statInfo ? statInfo.description : "'not found'"}"
                    ${goodClass ? `good=${goodClass}` : ""}
                >${statValue > 0 && statName != "maxhp" ? "+" : ""}${statInfo.percentage ?
                    `${statValue * 100}%`
                    :
                    statValue
                }</div>
            `
        }
    }

    returnStats.all = returnStats.core + returnStats.in + returnStats.out
    if(returnStats.all == "") return false
    return returnStats
}


// MISCELLANEOUS
	//ITEM_EXECS
    env.ITEM_EXEC.superstitionFish = (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "TAROTFISH")) {
            chatter({actor: 'sourceless', text: `the shell refuses, having lost their taste for this fish.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }
        
        target.alterations.push(["STATUS", "hands_superstition", "TAROTFISH"])
        play('talkfairy', 2)
        removeItem(env.ITEM_LIST.fish_tarot)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    }

	//ITEMS
	env.ITEM_LIST.fish_tarot = {
        slug: "fish_tarot",
        name: "Card Fish",
        imgClass: "fish",
        image: "/img/sprites/flantrusive/flanfisch.gif",
        description: `'intrusive species';'clutching strange deck of cards'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'imbue with superstition'",
        type: 'target',
        exec: "superstitionFish",
        group: "fish",
        max: 10,
        batches: 1
    }
	
	//FISHIES
	FishingMinigame.fishies.fish_tarot = {
		item: "fish_tarot",
		stats: {
			"--fishspeed-x": [6, 9],
			"--fishspeed-y": [3, 7],
			"--fishspeed-rot": [1, 2],

			jumpRate: 1.5,
			jumpMod: 3,
			pullMod: 1,
			adjustMod: 1.1,
		}
	}
}})