var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mod = (function (_super) {
    __extends(Mod, _super);
    function Mod() {
        _super.apply(this, arguments);
    }
    Mod.prototype.onInitialize = function (saveDataGlobal) {
    };
    Mod.prototype.onLoad = function (saveData) {
        this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
    };
    Mod.prototype.onUnload = function () {
    };
    Mod.prototype.onSave = function () {
    };
    Mod.prototype.onGameStart = function (isLoadingSave, playedCount) {
        this.pickupHotkey = this.addKeyBind("Pick Up Helper", 71);
    };
    Mod.prototype.onKeyBindPress = function (key) {
        if (key == this.pickupHotkey && $("input:focus").length == 0) {
            if (game.isTileEmpty(player.x + player.direction.x, player.y + player.direction.y, player.z)) {
                ui.displayMessage(this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }
            var tilecontainer = Item.getTileContainer(player.x + player.direction.x, player.y + player.direction.y, player.z);
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
    };
    return Mod;
}(Mods.Mod));
