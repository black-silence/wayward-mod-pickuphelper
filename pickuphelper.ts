import { MessageType } from "language/Messages";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";

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

    public onBindLoop(bindPressed: true | undefined, api: BindCatcherApi): true | undefined {

        if (api.wasPressed(this.pickupHotkey) && !bindPressed) {

            let facing = localPlayer.getFacingPoint();
            if (game.isTileEmpty(facing.x, facing.y, facing.z)) {
                ui.displayMessage(localPlayer, this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            let tilecontainer = itemManager.getTileContainer(facing.x, facing.y, facing.z);

            if (ui.isContainerOpen(tilecontainer)) {
                return undefined;
            }

            // The tile may not be empty but that doesn't mean there are items. Could be a chest here.
            if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                ui.displayMessage(localPlayer, this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            let tile = localPlayer.getFacingTile();
            if (game.isOnFire(tile)) {
                localPlayer.burn()
            }

            ui.openContainer(tilecontainer);
            bindPressed = true;
        }

        return bindPressed;
    }

}