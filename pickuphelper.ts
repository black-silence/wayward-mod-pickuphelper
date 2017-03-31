import { KeyBind } from "Enums";
import { MessageType } from "language/Messages";
import Mod from "mod/Mod";

export default class PickUpHelper extends Mod {

    private pickupHotkey: number;
    private pickupNoItemsMessage: number;

    public onInitialize(saveDataGlobal: any): any {
    }

    /**
     * Called when the mod is loaded called after a player starts/loads a world.
     * Called before the world is loaded
     * @param saveData The save data object you previously saved via onSave()
     */
    public onLoad(saveData: any): void {
        this.pickupNoItemsMessage = this.addMessage('pickupNoItems', "There are no items in front of you.");
    }

    /**
     * Called when the game is starting
     * @param isLoadingSave True if a save game was loaded
     * @param playedCount The number of times the player has played the game (globally, not per slot)
     */
    public onGameStart(isLoadingSave: boolean, playedCount: number): void {
        this.pickupHotkey = this.addKeyBind("Pick Up Helper", 71); // Default: G
    }

    /**
     * Called when a keybind is pressed
     * @param keyBind The keybind
     * @returns False to cancel the keybind press or undefined to use the default logic
     */
    public onKeyBindPress(key: KeyBind): boolean {

        if (key == this.pickupHotkey && $("input:focus").length == 0) {

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
        }

        return undefined;
    }

}