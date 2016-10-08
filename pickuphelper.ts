/// <reference path="mod-reference/modreference.d.ts"/>

class Mod extends Mods.Mod {

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

    public onUnload(): void {
    }

    public onSave(): any {
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

            if (game.isTileEmpty(player.x + player.direction.x, player.y + player.direction.y, player.z)) {
                ui.displayMessage(this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            let tilecontainer = Item.getTileContainer(player.x + player.direction.x, player.y + player.direction.y, player.z);

            if (ui.isContainerOpen(tilecontainer)) {
                return undefined;
            }

            // The tile may not be empty but that doesn't mean there are items. Could be a chest here.
            if (Item.getItemsInContainer(tilecontainer).length == 0) {
                ui.displayMessage(this.pickupNoItemsMessage, MessageType.Bad);
                return undefined;
            }

            ui.openContainer(tilecontainer);
        }

        return undefined;
    }

}