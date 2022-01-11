function main() {
    function createRanNum() {
        return Math.floor(Math.random() * 15) + 1;
    }

    function createRanId() {
        const idNum = String(Math.floor(Math.random() * 9000) + 1000).split("");
        const alphabet = ["a","b","c","d","e","f","g","h","i","j"];
        const id = [];
        idNum.forEach(el => id.push(alphabet[Number(el)]));
        return id.join("");
    }

    function addRanId() {
        const ranId = [createRanId()];
        let index = 0;
        while(ranId.length < 13) {
            const id = createRanId(); 
            if(ranId[index] != id) {
                ranId.push(id);
                index++;
            }
        }
        return ranId;
    }

    const ranId = addRanId();

    class VideoData {
        constructor(name,id,time) {
            this.name = name;
            this.id = id;
            this.time = time;
            this.next = undefined;
            this.prev = undefined;
        };

        printData() {
            const dataInfo = `${this.name}(${this.id}): ${this.time}sec`;
            return dataInfo;
        };
    }

    function createData(idArray) {
        const datas = [];
        for(let i = 0; i < idArray.length; i++) {
            const temp = new VideoData(`제목${i + 1}`,idArray[i],createRanNum());
            datas.push(temp);
        }
        return datas;
    }

    const datas = createData(ranId);

    datas.forEach(el => console.log(el.printData()));

    const LinkedList = {
        head : undefined,
        last : undefined,
        length : 0 
    }

    function findIndex(id) {
        for(let i = 0; i < datas.length; i++) {
            if(datas[i].id === id) {
                return i;
            };
        }
        return;
    }

    function findTurnIndex(turn) {
        let data = LinkedList.head;
        for(let i = 0; i < turn; i++) {
            if(i === turn - 1) {
                return data;
            }
            data = datas[findIndex(data)].next;
        }
        return;
    }

    function add(id) {
        if(checkAlready(id)) {
            console.log("이미 추가한 노드입니다.")
            return;
        }
        if(LinkedList.last === undefined) {
            LinkedList.head = id;
            LinkedList.last = id;
            LinkedList.length++;
            printLinkedlist();
            return;
        }
        const lastNode = datas[findIndex(id)];
        const frontNode = datas[findIndex(LinkedList.last)];
        LinkedList.last = id;
        lastNode.prev = frontNode.id;
        frontNode.next = id;
        LinkedList.length++;
        printLinkedlist();
        return;
    }

    function checkAlready(id) {
        if(LinkedList.length === 0) {
            return;
        }
        let data = LinkedList.head;
        for(let i = 0; i < LinkedList.length; i++) {
            if(data === id) {
                return true;
            } else if (LinkedList === 1) {
                return false;
            } else {
                data = datas[findIndex(data)].next;
            };
        }
        return;
    }

    function insert(id,turn) {
        if(checkAlready(id)) {
            console.log("이미 추가한 노드입니다.")
            return;
        }
        if(LinkedList.last === undefined) {
            LinkedList.head = id;
            LinkedList.last = id;
            LinkedList.length++;
            printLinkedlist();
            return;
        }
        if(turn === 0) {
            const headNode = datas[findIndex(id)];
            const nextNode = datas[findIndex(LinkedList.head)];
            LinkedList.head = id;
            headNode.next = nextNode.id;
            nextNode.prev = id;
        } else if(LinkedList.length < turn) {
            add(id);
            return;
        } else {
            const insertNode = datas[findIndex(id)];
            const frontNode = datas[findIndex(findTurnIndex(turn - 1))];
            const backNode = datas[findIndex(findTurnIndex(turn))];
            insertNode.prev = frontNode.id;
            insertNode.next = backNode.id;
            frontNode.next = id;
            backNode.prev = id;
        };
        LinkedList.length++;
        printLinkedlist();
        return;
    }

    function del(id) {
        const delNode = datas[findIndex(id)];
        switch(LinkedList.length) {
            case 0 :
                console.log("지울 노드가 없습니다.")
                break;
            case 1 :
                LinkedList.head = undefined;
                LinkedList.last = undefined;
                break;
            case 2 :
                LinkedList.head === id ? LinkedList.head = LinkedList.last : LinkedList.last = LinkedList.head;
                break;
            default :
                if(delNode.next === undefined) {
                    const frontNode = datas[findIndex(delNode.prev)];
                    frontNode.next = undefined;
                    LinkedList.last = frontNode.id;
                    delNode.prev = undefined;
                    break;
                } else if(delNode.prev === undefined) {
                    const backNode = datas[findIndex(delNode.next)];
                    backNode.prev = undefined;
                    LinkedList.head = backNode.id;
                    delNode.next = undefined;
                    break;
                } else {
                    const frontNode = datas[findIndex(delNode.prev)];
                    const backNode = datas[findIndex(delNode.next)];
                    frontNode.next = backNode.id;
                    backNode.prev = frontNode.id;
                    delNode.next = undefined;
                    delNode.prev = undefined;
                    break;
                }
        }
        LinkedList.length--;
        printLinkedlist();
        return;
    }

    function printLinkedlist() {
        let data = datas[findIndex(LinkedList.head)];
        console.log("[start]")
        for(let i = 0; i < LinkedList.length; i++) {
            console.log(data.printData());
            if(LinkedList.length === 1) {
                break;
            }
            data = datas[findIndex(data.next)];
        }
        console.log("[end]");
        return;
    }

    function checkId(id) {
        for(let i = 0; i < datas.length; i++) {
            if(datas[i].id === id) {
                return false;
            };
        };
        return true;
    }

    function render() {
        let runtime = 0;
        let data = datas[findIndex(LinkedList.head)]
        for(let i = 0; i < LinkedList.length; i++) {
            runtime += data.time;
            if(data.next === undefined) {
                break;
            }
            data = datas[findIndex(data.next)];
        }
        console.log(`재생목록 : ${LinkedList.length}개, 총 재생시간 : ${runtime}sec`);
        return;
    }

    const { link } = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.setPrompt("==> ");
    rl.prompt();
    rl.on("line", function(input) {
            let info = input.split(" ");
            let id = checkId(info[1]);
            if(id === true) {
                console.log("올바른 값을 입력하세요");
                return;
            }
            switch(info[0]) {
                case "render" :
                    render();
                    break;
                case "add" :
                    add(info[1]);
                    break;
                case "del" :
                    del(info[1]);
                    break;
                case "insert" :
                    insert(info[1],Number(info[2]));
                    break;
                case "q" :
                    console.log("종료합니다")
                    rl.close();
                default :
                    console.log("올바른 명령을 입력하세요.")
                    break;
            }
        }).on("close", function() {
            process.exit();
        })
};

main();