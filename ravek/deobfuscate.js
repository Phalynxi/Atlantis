const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'Ravek mod.js'), 'utf8');

const ast = parser.parse(code, {
    sourceType: 'script',
    plugins: ['dynamicImport'],
    allowReturnOutsideFunction: true,
    errorRecovery: true
});

// ============================================================
// Find the main game module (Module 16) and apply renames there
// The module array is the argument to the IIFE: !function(e){...}([module0, module1, ...])
// ============================================================

let modulesArrayPath = null;

traverse(ast, {
    Program(path) {
        const stmt = path.node.body[0];
        if (!t.isExpressionStatement(stmt)) return;
        const unary = stmt.expression;
        if (!t.isUnaryExpression(unary) || unary.operator !== '!') return;
        const callExpr = unary.argument;
        if (!t.isCallExpression(callExpr)) return;
        if (!t.isFunctionExpression(callExpr.callee)) return;
        if (callExpr.arguments[0] && t.isArrayExpression(callExpr.arguments[0])) {
            modulesArrayPath = path.get('body.0.expression.argument.arguments.0');
            console.log('Found modules array with', callExpr.arguments[0].elements.length, 'modules');
        }
    }
});

if (!modulesArrayPath) {
    // Debug: find the IIFE
    traverse(ast, {
        CallExpression(path) {
            const callee = path.node.callee;
            if (t.isUnaryExpression(callee) && callee.operator === '!' && t.isFunctionExpression(callee.argument)) {
                if (path.node.arguments[0] && t.isArrayExpression(path.node.arguments[0])) {
                    console.log('Found IIFE with array at depth:', path.getStatementParent()?.node?.type);
                    console.log('Array elements count:', path.node.arguments[0].elements.length);
                    modulesArrayPath = path.get('arguments.0');
                }
            }
        }
    });
    if (!modulesArrayPath) {
        console.error('Could not find modules array even with deep search');
        process.exit(1);
    }
}

// ============================================================
// Module 16 is the main game client - apply specific renames
// Based on comparing with Robotis.js
// ============================================================

// These are the renames for Module 16 (the big game client module at index 16 in the array)
// Found by cross-referencing document.getElementById calls and usage patterns with Robotis.js

const MODULE_16_RENAMES = {
    // DOM Elements (from document.getElementById calls)
    'Pe': 'mainMenu',
    'Te': 'enterGame',
    'Ae': 'partyButton',
    'Be': 'joinPartyButton',
    'Me': 'settingsButton',
    'Ce': 'settingsButtonSpan',
    'Re': 'allianceButton',
    'Oe': 'storeButton',
    'je': 'chatButton',
    'Ue': 'gameCanvas',
    'Le': 'mainContext',
    'De': 'nativeResolutionOption',
    'ze': 'showPingOption',
    'Ye': 'shutdownDisplay',
    'Fe': 'menuCardHolder',
    'He': 'guideCard',
    'We': 'loadingText',
    'qe': 'gameUI',
    'Ne': 'actionBar',
    'Xe': 'scoreDisplay',
    'Ve': 'foodDisplay',
    'Ge': 'woodDisplay',
    'Je': 'stoneDisplay',
    '$e': 'killCounter',
    'Ke': 'leaderboardData',
    'Ze': 'nameInput',
    'Qe': 'itemInfoHolder',
    'et': 'ageText',
    'tt': 'ageBarBody',
    'nt': 'upgradeHolder',
    'rt': 'upgradeCounter',
    'it': 'allianceMenu',
    'at': 'allianceHolder',
    'ot': 'allianceManager',
    'st': 'mapDisplay',
    'ct': 'diedText',
    'lt': 'skinColorHolder',
    'ut': 'mapContext',
    'ft': 'storeMenu',
    'ht': 'storeHolder',
    'dt': 'notificationDisplay',

    // Performance display elements
    'Gr': 'performanceDisplay',
    'Jr': 'pingValueEl',
    '$r': 'cpsValueEl',
    'Kr': 'fpsValueEl',
    'Zr': 'packetValueEl',

    // Canvas/rendering
    'ye': 'offscreenCanvas',
    'ke': 'offscreenCtx',
    'be': 'offscreenCanvas2',
    've': 'offscreenCtx2',
    'we': 'offscreenCanvas3',
    'xe': 'offscreenCtx3',
    'ge': 'maxScreenWidth',
    'me': 'maxScreenHeight',

    // Game state
    'Ie': 'inGame',
    'pe': 'skinColor',
    'Ee': 'camX',
    'Se': 'camY',
    'ue': 'mouseX',
    'fe': 'mouseY',

    // Core game arrays & objects
    // Y=players, F=ais, H=teams/alliances, W=projectiles, q=gameObjects
    // Careful with single letters - only rename if in this module's scope
    
    // Player reference
    // j = myPlayer (the local player object)

    // Store data
    'pt': 'hats',
    'gt': 'accessories',
    'mt': 'projectileManager',

    // Packet handler functions
    'yt': 'setupGame',
    'xt': 'onDisconnect',
    'Et': 'showLoadingText',
    'Bn': 'addPlayer',
    'Rr': 'updatePlayers',
    '_r': 'removePlayer',
    'Lr': 'updateLeaderboard',
    'Fn': 'loadGameObject',
    'br': 'loadAI',
    'Ir': 'animateAI',
    'Sr': 'gatherAnimation',
    'Jn': 'wiggleGameObject',
    'vr': 'shootTurret',
    'wr': 'updatePlayerValue',
    'jr': 'updateHealth',
    'Ur': 'killObject',
    'Rn': 'killPlayer',
    'On': 'updateItemCounts',
    '_n': 'updateAge',
    'Or': 'handleProjectile',
    'Yn': 'addAlliance',
    'zn': 'serverShutdown',
    'tn': 'setAlliancePlayers',
    'xr': 'handleAlliance',
    'Er': 'setPlayerTeam',
    'ai': 'setAllianceMembers',
    '_t': 'addAllianceNotification',
    'Ut': 'deleteAlliance',
    'Ct': 'addAllianceRequest',
    'Rt': 'showAllianceNotification',
    'Ot': 'onSetTeam',
    'jt': 'onAllianceMembers',
    'Lt': 'showAllianceMenu',
    'Vt': 'pingSocketResponse',
    'pn': 'showText',
    'Mn': 'updateStoreItems',
    'Xt': 'receiveChat',
    'ri': 'setInitData',

    // UI/Game functions
    'It': 'showItemInfo',
    'Tn': 'selectItem',
    'St': 'menuPanels',
    'Dt': 'handleAllianceAction',
    'wn': 'sendInput',
    'Pn': 'toggleAlliance',

    // Store/Hat functions  
    'hn': 'closeMenus',
    'Kt': 'updateAllianceUI',
    '$t': 'renderAllianceList',

    // Save/Load
    // P = saveVal, T = getSavedVal (single letter, risky)

    // Game state vars
    'wt': 'windowFocused',
    'bt': 'youtubers',
    'vt': 'featuredYoutuber',
    'kt': 'featuredYoutubeEl',

    // Touch state
    'he': 'moveTouch',
    'de': 'aimTouch',

    // Icon loading
    'Ln': 'iconNames',
    'Un': 'iconCache',

    // Resize/display
    'nn': 'setNativeResolution',
    'ti': 'updatePerfDisplay',
    'rn': 'resizeGame',

    // Rendering
    'rr': 'weaponImageCache',
    'lr': 'getItemSprite',

    // Notification
    'Bt': 'allianceRequests',
    'Mt': 'allianceMemberList',

    // Biome/river
    'te': 'riverPoints',
    'ne': 'riverPointsLow',
    'ee': 'biomes',
    're': 'interpolateRiver',
    'ie': 'sampleRiverPoints',

    // Misc identified functions/vars
    'ii': 'pingSocket',
    'un': 'toggleChat',
};

// Apply renames to Module 16 using scope-aware traversal
const module16Path = modulesArrayPath.get('elements.16');
if (module16Path && module16Path.node) {
    // First try scope.rename for all bindings in this scope
    const scope = module16Path.scope;
    let renamed = 0;
    
    for (const [oldName, newName] of Object.entries(MODULE_16_RENAMES)) {
        // Try all nested scopes
        let found = false;
        module16Path.traverse({
            Scope(scopePath) {
                if (found) return;
                const binding = scopePath.scope.getBinding(oldName);
                if (binding) {
                    try {
                        scopePath.scope.rename(oldName, newName);
                        found = true;
                        renamed++;
                    } catch(e) {}
                }
            }
        });
        // Also try the function scope directly
        if (!found) {
            try {
                const binding = scope.getBinding(oldName);
                if (binding) {
                    scope.rename(oldName, newName);
                    renamed++;
                }
            } catch(e) {}
        }
    }
    console.log(`Module 16: renamed ${renamed} variables`);
} else {
    console.log('Module 16 not found!');
}

// ============================================================
// Module 0: Config exports - rename config objects
// ============================================================
const module0Path = modulesArrayPath.get('elements.0');
if (module0Path && module0Path.node) {
    const CONFIG_RENAMES = {
        's': 'screenConfig',
        'c': 'serverConfig',
        'l': 'gridConfig',
        'u': 'clientConfig',
        'f': 'uiConfig',
        'h': 'chatConfig',
        'd': 'sandboxConfig',
        'p': 'playerConfig',
        'g': 'skinConfig',
        'm': 'animalConfig',
        'y': 'weaponConfig',
        'k': 'worldConfig',
        'b': 'biomeConfig',
        'v': 'mapConfig',
        'w': 'damageConfig',
        'a': 'weaponVariants',
        'o': 'spawnConfig',
    };
    // Module 0 is wrapped in (function(e){...}).call(this, n(42))
    // The actual vars are in the inner function scope
    // Let's traverse into it
    traverse(module0Path.node, {
        VariableDeclarator(path) {
            const name = path.node.id.name;
            if (CONFIG_RENAMES[name] && path.node.init && t.isObjectExpression(path.node.init)) {
                const keys = path.node.init.properties
                    .filter(p => t.isIdentifier(p.key) || t.isStringLiteral(p.key))
                    .map(p => p.key.name || p.key.value);
                // Verify it's the right variable by checking properties
                if (name === 's' && keys.includes('maxScreenWidth')) {
                    try { path.scope.rename('s', 'screenConfig'); } catch(e) {}
                }
                if (name === 'c' && keys.includes('serverUpdateRate')) {
                    try { path.scope.rename('c', 'serverConfig'); } catch(e) {}
                }
                if (name === 'l' && keys.includes('colGrid')) {
                    try { path.scope.rename('l', 'gridConfig'); } catch(e) {}
                }
                if (name === 'u' && keys.includes('clientSendRate')) {
                    try { path.scope.rename('u', 'clientConfig'); } catch(e) {}
                }
                if (name === 'f' && keys.includes('healthBarWidth')) {
                    try { path.scope.rename('f', 'uiConfig'); } catch(e) {}
                }
                if (name === 'h' && keys.includes('chatCountdown')) {
                    try { path.scope.rename('h', 'chatConfig'); } catch(e) {}
                }
                if (name === 'd' && keys.includes('isSandbox')) {
                    try { path.scope.rename('d', 'sandboxConfig'); } catch(e) {}
                }
                if (name === 'p' && keys.includes('maxAge')) {
                    try { path.scope.rename('p', 'playerConfig'); } catch(e) {}
                }
                if (name === 'g' && keys.includes('skinColors')) {
                    try { path.scope.rename('g', 'skinConfig'); } catch(e) {}
                }
                if (name === 'v' && keys.includes('mapScale')) {
                    try { path.scope.rename('v', 'mapConfig'); } catch(e) {}
                }
                if (name === 'w' && keys.includes('cactusDamage')) {
                    try { path.scope.rename('w', 'damageConfig'); } catch(e) {}
                }
            }
            if (name === 'a' && path.node.init && t.isArrayExpression(path.node.init)) {
                const first = path.node.init.elements[0];
                if (first && t.isObjectExpression(first)) {
                    const keys = first.properties.filter(p => t.isIdentifier(p.key)).map(p => p.key.name);
                    if (keys.includes('xp') && keys.includes('val')) {
                        try { path.scope.rename('a', 'weaponVariants'); } catch(e) {}
                    }
                }
            }
            if (name === 'o' && path.node.init && t.isObjectExpression(path.node.init)) {
                const keys = path.node.init.properties.filter(p => t.isIdentifier(p.key)).map(p => p.key.name);
                if (keys.includes('treesPerArea')) {
                    try { path.scope.rename('o', 'spawnConfig'); } catch(e) {}
                }
            }
            // animalConfig and weaponConfig have nested object detection
            if (name === 'm' && path.node.init && t.isObjectExpression(path.node.init)) {
                const keys = path.node.init.properties.filter(p => t.isIdentifier(p.key)).map(p => p.key.name);
                if (keys.includes('animalCount') || keys.includes('cowNames')) {
                    try { path.scope.rename('m', 'animalConfig'); } catch(e) {}
                }
            }
            if (name === 'y' && path.node.init && t.isObjectExpression(path.node.init)) {
                const keys = path.node.init.properties.filter(p => t.isIdentifier(p.key)).map(p => p.key.name);
                if (keys.includes('shieldAngle')) {
                    try { path.scope.rename('y', 'weaponConfig'); } catch(e) {}
                }
            }
            if (name === 'b' && path.node.init && t.isObjectExpression(path.node.init)) {
                const keys = path.node.init.properties.filter(p => t.isIdentifier(p.key)).map(p => p.key.name);
                if (keys.includes('snowSpeed') || keys.includes('biomes')) {
                    try { path.scope.rename('b', 'biomeConfig'); } catch(e) {}
                }
            }
            if (name === 'k' && path.node.init && t.isCallExpression(path.node.init)) {
                // k = Object.assign({...}, o, {spawnCounts: o})
                try { path.scope.rename('k', 'worldConfig'); } catch(e) {}
            }
        }
    }, module0Path.scope);
}

// ============================================================
// Module 16 deeper: rename module imports
// The imports are: var l=n(21), u=n(39), f=n(40), h=n(41).default, etc.
// ============================================================
if (module16Path) {
    // These are the webpack require imports at the top of module 16
    const MODULE_IMPORTS = {
        // l=n(21) -> socket module
        // u=n(39) -> UTILS
        // f=n(40) -> text module
        // h=n(41).default -> config 
        // d=n(43) -> items/weapons data
        // p=n(44) -> items class
        // g=n(46) -> projectile manager class
        // m=n(47) -> AI manager
        // y=n(48) -> store data
        // k=n(50) -> object manager class
        // b=n(51) -> renderer/objectmanager
        // v=n(52) -> unknown
    };
    
    // We need to find these specific variable declarations within module 16's scope
    traverse(module16Path.node, {
        VariableDeclarator(path) {
            const name = path.node.id.name;
            const init = path.node.init;
            if (!init) return;
            
            // Match: l = n(21) pattern  
            if (t.isCallExpression(init) && t.isIdentifier(init.callee, {name: 'n'})) {
                const arg = init.arguments[0];
                if (t.isNumericLiteral(arg)) {
                    const importMap = {
                        21: { varName: 'l', newName: 'socketModule' },
                        39: { varName: 'u', newName: 'UTILS' },
                        40: { varName: 'f', newName: 'textModule' },
                        43: { varName: 'd', newName: 'itemsData' },
                        44: { varName: 'p', newName: 'items' },
                        46: { varName: 'g', newName: 'ProjectileManager' },
                        47: { varName: 'm', newName: 'AiManager' },
                        48: { varName: 'y', newName: 'storeData' },
                        50: { varName: 'k', newName: 'ObjectManager' },
                        51: { varName: 'b', newName: 'Objectmanager' },
                        52: { varName: 'v', newName: 'mapModule' },
                        58: { varName: 'X', newName: 'RendererClass' },
                        59: { varName: 'V', newName: 'rendererData' },
                    };
                    const entry = importMap[arg.value];
                    if (entry && name === entry.varName) {
                        try { path.scope.rename(name, entry.newName); } catch(e) {}
                    }
                }
            }
            // h = n(41).default -> config
            if (t.isMemberExpression(init) && t.isIdentifier(init.property, {name: 'default'})) {
                if (t.isCallExpression(init.object) && t.isIdentifier(init.object.callee, {name: 'n'})) {
                    const arg = init.object.arguments[0];
                    if (t.isNumericLiteral(arg) && arg.value === 41 && name === 'h') {
                        try { path.scope.rename('h', 'config'); } catch(e) {}
                    }
                }
            }
        }
    }, module16Path.scope);
    
    // Now rename game state variables in module 16's function scope
    const GAME_STATE_RENAMES = {
        // Core constants
        'S': 'PI',
        'I': 'TWO_PI',
        
        // Save/load
        'E': 'canStore',
        'P': 'saveVal',
        'T': 'getSavedVal',
        'M': 'moofoll',
        'A': 'nativeRes',
        'B': 'showPing',
        
        // Camera/display
        'D': 'zoom',
        'Z': 'serverTick',
        'Q': 'tickCounter',
        
        // Game arrays  
        'Y': 'players',
        'F': 'ais',
        'H': 'teams',
        'W': 'projectiles',
        'q': 'gameObjects',
        'N': 'objManager',
        'G': 'renderer',
        'J': 'layers',
        'K': 'getLayer',
        
        // Player
        'j': 'myPlayer',
        'U': 'myPlayerSID',
        'L': 'playerSID',
        'O': 'tmpObj',
        'R': 'tmpPlayer',
        'C': 'tmpData',
        '_': 'tmpVal',
    };
    
    const scope16 = module16Path.scope;
    let renamed2 = 0;
    for (const [oldName, newName] of Object.entries(GAME_STATE_RENAMES)) {
        let found = false;
        module16Path.traverse({
            Scope(scopePath) {
                if (found) return;
                const binding = scopePath.scope.getBinding(oldName);
                if (binding) {
                    try {
                        scopePath.scope.rename(oldName, newName);
                        found = true;
                        renamed2++;
                    } catch(e) {}
                }
            }
        });
        if (!found) {
            try {
                const binding = scope16.getBinding(oldName);
                if (binding) { scope16.rename(oldName, newName); renamed2++; }
            } catch(e) {}
        }
    }
    console.log(`Module 16 game state: renamed ${renamed2} variables`);
}

// ============================================================
// Apply to other game modules too (32=gameUtils, 33=renderer, 34=gameLogic, 35=items)
// ============================================================

// Module 32: Math/game utilities
const module32Path = modulesArrayPath.get('elements.32');
if (module32Path && module32Path.node) {
    // These typically export lerp, dist, containsPoint, pointInBiome, etc.
}

// Module 34: Item/weapon definitions
const module35Path = modulesArrayPath.get('elements.35');
// Module 37: Object handler

// ============================================================
// PHASE: Boolean cleanup
// ============================================================
traverse(ast, {
    UnaryExpression(path) {
        if (path.node.operator === '!' && t.isNumericLiteral(path.node.argument)) {
            if (path.node.argument.value === 0) path.replaceWith(t.booleanLiteral(true));
            else if (path.node.argument.value === 1) path.replaceWith(t.booleanLiteral(false));
        }
        if (path.node.operator === 'void' && t.isNumericLiteral(path.node.argument) && path.node.argument.value === 0) {
            path.replaceWith(t.identifier('undefined'));
        }
    }
});

// ============================================================
// PHASE: Expand comma expressions to separate statements
// ============================================================
traverse(ast, {
    ExpressionStatement(path) {
        if (t.isSequenceExpression(path.node.expression)) {
            const stmts = path.node.expression.expressions.map(e => t.expressionStatement(e));
            path.replaceWithMultiple(stmts);
        }
    }
});

// Generate formatted code first
const output = generate(ast, {
    comments: true,
    compact: false,
    retainLines: false,
    concise: false,
    jsescOption: { minimal: true }
});

let finalCode = output.code.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\n?/, '');

// ============================================================
// PHASE: Regex-based word-boundary renaming
// Since Babel scope analysis can't reach deeply nested vars,
// we do safe word-boundary replacements on the text output.
// These names are minifier-generated and unique within their module.
// ============================================================

const REGEX_RENAMES = {
    // DOM Elements
    'Pe': 'mainMenu',
    'Te': 'enterGameBtn',
    'Ae': 'partyBtn',
    'Be': 'joinPartyBtn',
    'Me': 'settingsBtn',
    'Ce': 'settingsBtnSpan',
    'Re': 'allianceBtn',
    'Oe': 'storeBtn',
    'je': 'chatBtn',
    'Ue': 'gameCanvas',
    'Le': 'mainContext',
    'De': 'nativeResOption',
    'ze': 'showPingOption',
    'Ye': 'shutdownDisplay',
    'Fe': 'menuCardHolder',
    'He': 'guideCard',
    'We': 'loadingText',
    'qe': 'gameUI',
    'Ne': 'actionBar',
    'Xe': 'scoreDisplay',
    'Ve': 'foodDisplay',
    'Ge': 'woodDisplay',
    'Je': 'stoneDisplay',
    'Ke': 'leaderboardData',
    'Ze': 'nameInput',
    'Qe': 'itemInfoHolder',

    // More DOM  
    'et': 'ageText',
    'tt': 'ageBarBody',
    'nt': 'upgradeHolder',
    'rt': 'upgradeCounter',
    'it': 'allianceMenu',
    'at': 'allianceHolder',
    'ot': 'allianceManager',
    'st': 'mapDisplay',
    'ct': 'diedText',
    'lt': 'skinColorHolder',
    'ut': 'mapContext',
    'ft': 'storeMenu',
    'ht': 'storeHolder',
    'dt': 'notificationDisplay',
    'pt': 'hatsData',
    'gt': 'accessoriesData',
    'mt': 'projManager',

    // Performance display
    'Gr': 'perfDisplay',
    'Jr': 'pingValueEl',
    'Kr': 'fpsValueEl',
    'Zr': 'packetValueEl',

    // Canvases
    'ye': 'tempCanvas',
    'ke': 'tempCtx',
    'be': 'tempCanvas2',
    've': 'tempCtx2',
    'we': 'tempCanvas3',
    'xe': 'tempCtx3',
    'ge': 'maxScreenWidth',
    'me': 'maxScreenHeight',

    // Game state
    'Ie': 'inGame',
    'pe': 'skinColor',
    'Ee': 'camX',
    'Se': 'camY',
    'ue': 'mouseX',
    'fe': 'mouseY',
    'wt': 'windowFocused',

    // Packet handlers
    'yt': 'setupGame',
    'xt': 'onDisconnect',
    'Et': 'showLoadingText',
    'Bn': 'addPlayer',
    'Rr': 'updatePlayers',
    '_r': 'removePlayer',
    'Lr': 'updateLeaderboard',
    'Fn': 'loadGameObject',
    'br': 'loadAI',
    'Ir': 'animateAI',
    'Sr': 'gatherAnimation',
    'Jn': 'wiggleGameObject',
    'vr': 'shootTurret',
    'wr': 'updatePlayerValue',
    'jr': 'updateHealth',
    'Ur': 'killObject',
    'Rn': 'killPlayer',
    'On': 'updateItemCounts',
    '_n': 'updateAge',
    'Or': 'handleProjectile',
    'Yn': 'addAlliance',
    'zn': 'serverShutdown',
    'tn': 'setAlliancePlayers',
    'xr': 'handleAllianceAction',
    'Er': 'setPlayerTeam',
    'ai': 'setAllianceMembers',
    'Vt': 'pingSocketResponse',
    'pn': 'showText',
    'Mn': 'updateStoreItems',
    'Xt': 'receiveChat',
    'ri': 'setInitData',

    // Functions
    'It': 'showItemInfo',
    'Tn': 'selectItem',
    'St': 'menuPanels',
    'Dt': 'handleAllianceReq',
    'wn': 'sendInput',
    'Pn': 'toggleMinimap',
    'Lt': 'showAllianceUI',
    'Rt': 'showNotification',
    'Ct': 'addAllianceReq',
    '_t': 'addTeam',
    'Ot': 'onSetTeam',
    'jt': 'onAllianceMembers',
    'Ut': 'deleteAlliance',
    'Bt': 'allianceRequests',
    'Mt': 'memberList',

    // Game functions  
    'hn': 'closeMenus',
    'Kt': 'updateAllianceUI',
    '$t': 'renderAllianceList',
    'un': 'toggleChat',
    'nn': 'setNativeRes',
    'ti': 'updatePerfDisplay',
    'rn': 'resizeGame',
    'ii': 'pingSocket',

    // Touch state
    'he': 'moveTouch',
    'de': 'aimTouch',

    // Rendering/caching
    'rr': 'weaponImgCache',
    'lr': 'getItemSprite',
    'Ln': 'iconNames',
    'Un': 'iconCache',

    // River/biome
    'te': 'riverPoints',
    'ne': 'riverPointsLow',
    'ee': 'biomeData',
    're': 'interpolateRiver',
    'ie': 'sampleRiverPoints',

    // YouTuber data
    'bt': 'youtubers',
    'vt': 'featuredYoutuber',
    'kt': 'featuredYoutubeEl',

    // Rendering functions
    'Gn': 'renderLayer',
    'qn': 'renderProjectilesLayer',
    '$n': 'renderAILayer',
    'Ar': 'renderPlayersLayer',
    'Mr': 'renderDeadPlayers',
    'Vn': 'renderRiver',
    'Wn': 'drawJoystick',
    'Nn': 'projImgCache',
    'Xn': 'renderProjectile',
    'Cr': 'isOnScreen',
    'pr': 'renderCircle',
    'sr': 'getResSprite',
    'An': 'noRiverAnim',
    'Qr': 'renderGame',

    // Map/minimap
    'qt': 'mapPings',
    'Wt': 'mapPing',
    'Pt': 'deathMarker',
    'Tt': 'teammatePositions',
    'At': 'targetMarker',

    // Player rendering
    'dr': 'renderPlayer',
    'fr': 'renderSkin',
    'gr': 'renderTail',
    'mr': 'renderTool',
    'yr': 'renderHealthBar',
    'kr': 'renderNameTag',

    // Object rendering
    'cr': 'getObjSprite',
    'hr': 'getItemSpriteIcon',
    'ar': 'renderLeaf',
    'or': 'renderStar',
    'nr': 'renderBlob',
    'er': 'renderPolygon',

    // Input/movement - Hn is actually the main game loop (updateGame)
    'Hn': 'updateGame',
    'Kn': 'keyUp',
    'Sn': 'sendMoveDir',
    'En': 'getMoveDir',
    'In': 'getAttackDir',
    'Dn': 'onMouseDown',

    // Player update
    'Tr': 'updatePlayer',
    'Br': 'addPlayerObj',
    'Pr': 'removePlayerObj',
    'Fr': 'updatePlayerPos',

    // Store functions
    'Qn': 'buyHat',
    'er': 'buyAccessory',

    // Misc game funcs
    'Wr': 'doUpdate',
    'Nr': 'gameLoop',
    'Xr': 'requestAnimFrame',
    
    // Missed DOM
    '$e': 'killCounter',
    '$r': 'cpsValueEl',
    
    // Player/game state helpers
    'ae': 'gridOffsetX',
    'oe': 'gridOffsetY',
    'se': 'lastSendDir',
    'ce': 'lastMoveDir',
    'le': 'lastAttackDir',
};

// Apply word-boundary regex replacements
// Sort by length descending to avoid partial matches (e.g. 'Pe' before 'P')
const sortedRenames = Object.entries(REGEX_RENAMES)
    .sort((a, b) => b[0].length - a[0].length);

for (const [oldName, newName] of sortedRenames) {
    const regex = new RegExp(`(?<![a-zA-Z0-9_$])${oldName.replace(/\$/g, '\\$')}(?![a-zA-Z0-9_$])`, 'g');
    finalCode = finalCode.replace(regex, newName);
}

// Post-fix corrections using word-boundary regex (to rename ALL occurrences, not just declarations)
const CORRECTIONS_REGEX = [
    // keyDown was Hn, but it's actually updateGame (main render loop)
    ['keyDown', 'updateGame'],
    // serverShutdown was zn, but at ~3085 it's updateUpgrades
    // CAREFUL: 'serverShutdown' now refers to the upgrade function, 
    // and 'setAllianceMembers' at ~4005 is actually the shutdown notice
    // We need to swap them carefully:
    // Step 1: serverShutdown -> $$UPGRADES$$  (temp)
    // Step 2: setAllianceMembers -> serverShutdownNotice
    // Step 3: $$UPGRADES$$ -> updateUpgrades
];

// Do simple word-boundary renames for corrections
for (const [oldName, newName] of CORRECTIONS_REGEX) {
    const regex = new RegExp(`(?<![a-zA-Z0-9_$])${oldName.replace(/\$/g, '\\$')}(?![a-zA-Z0-9_$])`, 'g');
    finalCode = finalCode.replace(regex, newName);
}

// Multi-step swap for serverShutdown <-> setAllianceMembers
// Use split/join to avoid regex $ issues
// serverShutdown (currently = updateUpgrades func) -> temp
finalCode = finalCode.split('serverShutdownNotice').join('__TEMP_SHUTDOWN__');
finalCode = finalCode.split('serverShutdown').join('updateUpgrades');
// setAllianceMembers (currently = shutdown notice func) -> serverShutdownNotice
finalCode = finalCode.split('setAllianceMembers').join('serverShutdownNotice');
// restore the ones that were already serverShutdownNotice
finalCode = finalCode.split('__TEMP_SHUTDOWN__').join('serverShutdownNotice');

// Fix: addAlliance may have been clobbered by _n->updateAge rename
// Force correct: in the packet map, T: should be addAlliance
finalCode = finalCode.split('T: updateAge,').join('T: addAlliance,');

// Cleanup any leftover temp markers
finalCode = finalCode.split('$TEMP_UPGRADES$').join('updateUpgrades');
finalCode = finalCode.split('$$TEMP_UPGRADES$$').join('updateUpgrades');

// addAlliance is now correctly named (was Yn, packet T)

const header = `// ==UserScript==
// @name        Ravek Mod (Deobfuscated)
// @namespace   Violentmonkey Scripts
// @match       https://ravek.fly.dev/*
// @grant       none
// @version     1.0
// @author      -
// @description Deobfuscated ravek private server mod
// ==/UserScript==

`;

fs.writeFileSync(path.join(__dirname, 'Ravek mod.deobfuscated.js'), header + finalCode, 'utf8');
console.log('Done! Output: ravek/Ravek mod.deobfuscated.js');
console.log('Lines:', finalCode.split('\n').length);
