
class LinkedList {
    constructor(array) {
        this.datas = array;
        this.head = undefined;
        this.last = undefined;
        this.listlengt = 0;
    }

    findData(ids) {
        let dataIndex = 0;
        let datalen = this.datas.length;
        let dataId = this.datas;
        for(let i = 0; i <= datalen; i++) {
            if(dataId[i].id === ids) {
                return dataIndex;
            }
            dataIndex ++;
        };
    }

    findIndexData(order) {
        let data = this.head;
        for(let i = 0; i < this.listlengt; i++) {
            if(i === order) {
                return data;
            }
            data = this.datas[this.findData(data)].nextVideo;
        }
        return;
    }

    add(ids) {
        if(this.last === undefined) {
            this.head = ids;
            this.last = ids;
            this.listlengt++;
            return;
        };
        let last = this.datas[this.findData(this.last)];
        last.nextVideo = ids;
        this.last = ids;
        this.listlengt++;
        return;
    }

    insertCase(ids,position) {
        !position ? console.log("순서를 입력해주세요.")
        : position === 0 ? this.insertFirst(ids)
        : this.insert(ids,position);
    }

    insert(ids,position) {
        if(this.head === undefined) {
            this.head = ids;
            this.last = ids;
            this.listlengt++;
            return;
        }
        let back = this.datas[this.findData(this.findIndexData(position))];
        let insert = this.datas[this.findData(ids)];
        let front = this.datas[this.findData(position - 1)];
        insert.nextVideo = back.id;

        this.listlengt++;
        return;
    }

    insertFirst(ids) {
        if(this.head === undefined) {
            this.head = ids;
            this.listlengt++;
            return;
        }
        let newHead = this.datas[this.findData(this.ids)];
        newHead.nextVideo = this.head;
        this.head = ids;
        this.listlengt++;
    }

    printList() {
        let data = this.datas[this.findData(this.head)];
        for(let i = 0; i < this.listlengt; i++) {
            if(i === this.listlengt) {
                break;
            }
            console.log(`[${data.id},${data.time}sec]`);
            data = this.datas[this.findData(data.nextVideo)];
        };
        console.log(`[${data.id},${data.time}sec]`);
        console.log("[end]");
        return;
    }

    render() {
        console.log("영상클립: " + this.listlengt + "개")
        console.log("전체길이: " + this.listlengt + "sec")
    }
}

const list = new LinkedList(videoData);

list.add("abcd");
list.add("acbd");
list.insert("cabd",1)
list.printList();