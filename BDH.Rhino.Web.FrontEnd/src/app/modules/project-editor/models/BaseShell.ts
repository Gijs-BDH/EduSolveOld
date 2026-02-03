import { DataModel } from "@app/modules/project-editor/models/DataModel";

//provides an abstract class which is intended to be implemented by any application that is built upon the base 3d bag viewer application.
//work in progress

export abstract class BaseShell{

    abstract enumerateUserElements() : DataModel[];

    abstract removeAllUserElements() : void;

    abstract drawProjectToCanvas() : void;

    abstract zoomAll() : void;
}