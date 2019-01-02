import Register, { Registry } from "mod/ModRegistry";
import Message from "language/dictionary/Message";
import { MessageType } from "player/MessageManager";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";
import { HookMethod } from "mod/IHookHost";
import { Bindable } from "Enums";

export default class PickUpHelper extends Mod {

    @Register.bindable("PuhShowContainer", { key: "KeyG" })
    public readonly bindablePuhShowContainer: Bindable;

    @Register.message("PickupNoItems")
    public readonly messagePickupNoItems: Message;

    @HookMethod
    public onBindLoop(bindPressed: Bindable, api: BindCatcherApi): Bindable {

        if (api.wasPressed(this.bindablePuhShowContainer) && !bindPressed) {
            bindPressed = this.bindablePuhShowContainer;

            let facing = localPlayer.getFacingTile();
            if (game.isTileEmpty(facing)) {
                localPlayer.messages.type(MessageType.Bad).send(this.messagePickupNoItems);
                return undefined;
            }

            let facingPoint = localPlayer.getFacingPoint()
            let tilecontainer = itemManager.getTileContainer(facingPoint.x, facingPoint.y, facingPoint.z);

            if (ui.isContainerOpen(tilecontainer)) {
                return undefined;
            }

            // The tile may not be empty but that doesn't mean there are items. Could be a chest here.
            if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                localPlayer.messages.type(MessageType.Bad).send(this.messagePickupNoItems);
                return undefined;
            }

            let tile = localPlayer.getFacingTile();
            if (game.isOnFire(tile)) {
                localPlayer.burn()
            }

            ui.openContainer(tilecontainer);
        }

        return bindPressed;
    }

}