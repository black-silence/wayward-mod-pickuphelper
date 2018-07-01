var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "language/Messages", "mod/Mod", "mod/IHookHost"], function (require, exports, Messages_1, Mod_1, IHookHost_1) {
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
                let facing = localPlayer.getFacingTile();
                if (game.isTileEmpty(facing)) {
                    ui.displayMessage(localPlayer, this.pickupNoItemsMessage, Messages_1.MessageType.Bad);
                    return undefined;
                }
                let facingPoint = localPlayer.getFacingPoint();
                let tilecontainer = itemManager.getTileContainer(facingPoint.x, facingPoint.y, facingPoint.z);
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
    __decorate([
        IHookHost_1.HookMethod
    ], PickUpHelper.prototype, "onBindLoop", null);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PickUpHelper;
});
