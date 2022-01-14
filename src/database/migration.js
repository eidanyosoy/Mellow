const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const newSettings = require('./settings_format.json');
const BCRYPT_PATTERN = /^\$2[ayb]\$.{56}$/
const migrateJSON = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const settingsPath = path.join(__dirname, '..', '..', 'data', 'settings.json')
            let oldSettings;
            let migrated = true;
        
            if (fs.existsSync(settingsPath)) {
                oldSettings = require(settingsPath);
                
                if (!oldSettings.general.password.match(BCRYPT_PATTERN)) {
                    migrated = false
                    const salt = await bcrypt.genSalt(10);
                    const pwHash = await bcrypt.hash(oldSettings.general.password, salt);
                    oldSettings.general.password = pwHash;
                }

                const oProps = Object.getOwnPropertyNames(oldSettings);
                let oSize = oProps.length;
                let oPropSizes = [];
                oProps.forEach((prop) => {
                    oPropSizes.push(Object.getOwnPropertyNames(oldSettings[prop]).length);
                    oSize += Object.getOwnPropertyNames(oldSettings[prop]).length;
                });

                const nProps = Object.getOwnPropertyNames(newSettings);
                let nSize = nProps.length;
                let nPropSizes = [];
                nProps.forEach((prop) => {
                    nPropSizes.push(Object.getOwnPropertyNames(newSettings[prop]).length);
                    nSize += Object.getOwnPropertyNames(newSettings[prop]).length;
                });

                for (let i = 0; i < oPropSizes.length; i++)
                    if (oPropSizes[i] != nPropSizes[i])
                        migrated = false;

                if (oSize !== nSize || migrated === false) {
                    console.log("JSON Settings found! Migrating settings to new settings...");
                    migrated = false;
                }
                else {
                    console.log("JSON Settings already up-to-date! Skipping...");
                }

                if (!migrated)
                    for (const key in oldSettings)
                        for (const k in oldSettings[key])
                            if (newSettings[key].hasOwnProperty(k))
                                newSettings[key][k] = oldSettings[key][k];
            }
            else {
                console.log("No JSON settings found! Creating new JSON settings file...");
                migrated = false;
            }
        
            if (!migrated) fs.writeFileSync(settingsPath, JSON.stringify(newSettings));
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

const migrateALL = function() {
    return new Promise(async (resolve, reject) => {
        const jsonErr = await migrateJSON();
        if (jsonErr) reject(jsonErr);
        resolve();
    });
}

module.exports = {
    migrateJSON,
    migrateALL
}
