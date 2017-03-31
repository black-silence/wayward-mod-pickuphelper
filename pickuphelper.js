define(["require", "exports", "language/Messages", "mod/Mod"], function (require, exports, Messages_1, Mod_1) {
    "use strict";
    class PickUpHelper extends Mod_1.default {
        onInitialize(saveDataGlobal) {
        }
        onLoad(saveData) {
            this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
        }
        onGameStart(isLoadingSave, playedCount) {
            this.pickupHotkey = this.addKeyBind("Pick Up Helper", 71);
        }
        onKeyBindPress(key) {
            if (key == this.pickupHotkey && $("input:focus").length == 0) {
                if (game.isTileEmpty(localPlayer.x + localPlayer.direction.x, localPlayer.y + localPlayer.direction.y, localPlayer.z)) {
                    ui.displayMessage(localPlayer, this.pickupNoItemsMessage, Messages_1.MessageType.Bad);
                    return undefined;
                }
                let tilecontainer = itemManager.getTileContainer(localPlayer.x + localPlayer.direction.x, localPlayer.y + localPlayer.direction.y, localPlayer.z);
                if (ui.isContainerOpen(tilecontainer)) {
                    return undefined;
                }
                if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                    ui.displayMessage(localPlayer, this.pickupNoItemsMessage, Messages_1.MessageType.Bad);
                    return undefined;
                }
                ui.openContainer(tilecontainer);
            }
            return undefined;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PickUpHelper;
});
