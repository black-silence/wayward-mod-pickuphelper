define(["require", "exports"], function (require, exports) {
    "use strict";
    class Mod extends Mods.Mod {
        onInitialize(saveDataGlobal) {
        }
        onLoad(saveData) {
            this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
        }
        onUnload() {
        }
        onSave() {
        }
        onGameStart(isLoadingSave, playedCount) {
            this.pickupHotkey = this.addKeyBind("Pick Up Helper", 71);
        }
        onKeyBindPress(key) {
            if (key == this.pickupHotkey && $("input:focus").length == 0) {
                if (game.isTileEmpty(player.x + player.direction.x, player.y + player.direction.y, player.z)) {
                    ui.displayMessage(this.pickupNoItemsMessage, MessageType.Bad);
                    return undefined;
                }
                let tilecontainer = Item.getTileContainer(player.x + player.direction.x, player.y + player.direction.y, player.z);
                if (ui.isContainerOpen(tilecontainer)) {
                    return undefined;
                }
                if (Item.getItemsInContainer(tilecontainer).length == 0) {
                    ui.displayMessage(this.pickupNoItemsMessage, MessageType.Bad);
                    return undefined;
                }
                ui.openContainer(tilecontainer);
            }
            return undefined;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Mod;
});
