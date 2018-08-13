import { MessageType } from "language/IMessages";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";
import { HookMethod } from "mod/IHookHost";

export default class PickUpHelper extends Mod {

    private pickupHotkey: number;
    private pickupNoItemsMessage: number;

    public onInitialize(saveDataGlobal: any): any {
        this.pickupHotkey = this.addBindable("PuhShowContainer", {key:"KeyG"});
    }

    /**
     * Called when the mod is loaded called after a player starts/loads a world.
     * Called before the world is loaded
     * @param saveData The save data object you previously saved via onSave()
     */
    public onLoad(saveData: any): void {
        this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
    }

    @HookMethod
    public onBindLoop(bindPressed: Bindable, api: BindCatcherApi): Bindable {

        if (api.wasPressed(this.pickupHotkey) && !bindPressed) {
            bindPressed = this.pickupHotkey;

            let facing = localPlayer.getFacingTile();
            if (game.isTileEmpty(facing)) {
                localPlayer.messages.type(MessageType.Bad).send(this.pickupNoItemsMessage);
                return undefined;
            }

            let facingPoint = localPlayer.getFacingPoint()
            let tilecontainer = itemManager.getTileContainer(facingPoint.x, facingPoint.y, facingPoint.z);

            if (ui.isContainerOpen(tilecontainer)) {
                return undefined;
            }

            // The tile may not be empty but that doesn't mean there are items. Could be a chest here.
            if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                localPlayer.messages.type(MessageType.Bad).send(this.pickupNoItemsMessage);
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