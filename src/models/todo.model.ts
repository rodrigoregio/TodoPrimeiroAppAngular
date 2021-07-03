export class Todo{
    /**
     * Construtor do nosso todolist
     */
    constructor(
        public id: Number = 1,
        public title:String,
        public feito: Boolean) {
    }
}