import { MessageType } from "language/Messages";
import Mod from "mod/Mod";
import { BindCatcherApi } from "newui/BindingManager";

export default class PickUpHelper extends Mod {

    private pickupHotkey: number;
    private pickupNoItemsMessage: number;

    public onInitialize(saveDataGlobal: any): any {
        this.pickupHotkey = this.addBindable("PuhShowContainer", {key:"G"});
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

            if (game.isTileEmpty(localPlayer.x + localPlayer.direction.x, localPlayer.y + localPlayer.direction.y, localPlayer.z)) {
                ui.displayMessage(localPlayer, this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            let tilecontainer = itemManager.getTileContainer(localPlayer.x + localPlayer.direction.x, localPlayer.y + localPlayer.direction.y, localPlayer.z);

            if (ui.isContainerOpen(tilecontainer)) {
                return undefined;
            }

            // The tile may not be empty but that doesn't mean there are items. Could be a chest here.
            if (itemManager.getItemsInContainer(tilecontainer).length == 0) {
                ui.displayMessage(localPlayer, this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            ui.openContainer(tilecontainer);
            bindPressed = true;
        }

        return bindPressed;
    }

}