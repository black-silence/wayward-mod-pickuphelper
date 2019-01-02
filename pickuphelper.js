var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "mod/ModRegistry", "player/MessageManager", "mod/Mod", "mod/IHookHost"], function (require, exports, ModRegistry_1, MessageManager_1, Mod_1, IHookHost_1) {
    "use strict";
    class PickUpHelper extends Mod_1.default {
        onBindLoop(bindPressed, api) {
            if (api.wasPressed(this.bindablePuhShowContainer) && !bindPressed) {
                bindPressed = this.bindablePuhShowContainer;
                let facing = localPlayer.getFacingTile();
                if (game.isTileEmpty(facing)) {
                    localPlayer.messages.type(MessageManager_1.MessageType.Bad).send(this.messagePickupNoItems);
                    return undefined;
                }
                let facingPoint = localPlayer.getFacingPoint();
                let tilecontainer = itemManager.getTileContainer(facingPoint.x, facingPoint.y, facingPoint.z);
                if (ui.isContainerOpen(tilecontainer)) {
                    return undefined;
                }
                if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                    localPlayer.messages.type(MessageManager_1.MessageType.Bad).send(this.messagePickupNoItems);
                    return undefined;
                }
                let tile = localPlayer.getFacingTile();
                if (game.isOnFire(tile)) {
                    localPlayer.burn();
                }
                ui.openContainer(tilecontainer);
            }
            return bindPressed;
        }
    }
    __decorate([
        ModRegistry_1.default.bindable("PuhShowContainer", { key: "KeyG" })
    ], PickUpHelper.prototype, "bindablePuhShowContainer", void 0);
    __decorate([
        ModRegistry_1.default.message("PickupNoItems")
    ], PickUpHelper.prototype, "messagePickupNoItems", void 0);
    __decorate([
        IHookHost_1.HookMethod
    ], PickUpHelper.prototype, "onBindLoop", null);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = PickUpHelper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlja3VwaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBUUEsMkJBQTBDLGFBQUc7UUFTbEMsVUFBVSxDQUFDLFdBQXFCLEVBQUUsR0FBbUI7WUFFeEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLFdBQVcsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUM7Z0JBRTVDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDRCQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUMzRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyQixDQUFDO2dCQUVELElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQTtnQkFDOUMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyQixDQUFDO2dCQUdELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsNEJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQzNFLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN0QixDQUFDO2dCQUVELEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdkIsQ0FBQztJQUVMLENBQUM7SUExQ0c7UUFBQyxxQkFBUSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztrRUFBQTtJQUd2RDtRQUFDLHFCQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQzs4REFBQTtJQUdsQztRQUFDLHNCQUFVO2tEQUFBO0lBUmY7a0NBNENDLENBQUEifQ==