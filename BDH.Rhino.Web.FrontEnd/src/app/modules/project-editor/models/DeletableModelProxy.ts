import { SelectableModelProxy } from "./SelectableModelProxy";

//Extension of the SelectableModelProxy, exposes abstract method removeFromScene called by the keyboard-event-dispatcher service when delete is pressed.
//note to future developers: naturally, is should not be the responsibility of any model to be able to delete itself from its host. I have not gotten around to refactor yet.  

export abstract class DeletableModelProxy extends SelectableModelProxy {
    abstract removeFromScene() : void;
}
