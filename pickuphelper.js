define(["require", "exports", "language/Messages", "mod/Mod"], function (require, exports, Messages_1, Mod_1) {
    "use strict";
    class PickUpHelper extends Mod_1.default {
        onInitialize(saveDataGlobal) {
            this.pickupHotkey = this.addBindable("PuhShowContainer", { key: "KeyG" });
        }
        onLoad(saveData) {
            this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
        }
        onBindLoop(bindPressed, api) {
            if (api.wasPressed(this.pickupHotkey) && !bindPressed) {
                let facing = localPlayer.getFacingPoint();
                if (game.isTileEmpty(facing.x, facing.y, facing.z)) {
                    ui.displayMessage(localPlayer, this.pickupNoItemsMessage, Messages_1.MessageType.Bad);
                    return undefined;
                }
                let tilecontainer = itemManager.getTileContainer(facing.x, facing.y, facing.z);
                if (ui.isContainerOpen(tilecontainer)) {
                    return undefined;
                }
                if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                    ui.displayMessage(localPlayer, this.pickupNoItemsMessage, Messages_1.MessageType.Bad);
                    return undefined;
                }
                let tile = localPlayer.getFacingTile();
                if (game.isOnFire(tile)) {
                    localPlayer.burn();
                }
                ui.openContainer(tilecontainer);
                bindPressed = true;
            }
            return bindPressed;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PickUpHelper;
});
