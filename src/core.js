function Runner(playbook) {
    this.playbook = playbook;

    this.cursorSelector = null;
    this.$cursor = null;

    this.error = null;

    this.run();
    if (this.error !== null) {
        console.log(this.error);
    } else {
        console.log("OK")
    }
}

Runner.prototype = {
    run: function() {
        this.log("===================\nRunning the playbook\n===================\n")
        const lines = this.playbook.split("\n");

        for (const id in lines) {
            const line = lines[id];
            if (line.length > 1 && line[0] !== "#") {
                const lineSplitted = line.split("\t");
                const command = lineSplitted[0];
                const param = lineSplitted.length >= 2 ?
                    lineSplitted[1] : null;
                switch (command) {
                    case "get":
                        if (param) {
                            this.log(`Selecting ${param}`);
                            this.select(param);
                            this.log(`${this.$cursor.length} node selected`);
                        } else {
                            this.error(`no param`);
                            return;
                        }
                        break;
                    case "geteval":
                        if (param) {
                            this.log(`Selecting with eval ${param}`);
                            this.selectEval(param);
                            this.log(`${this.$cursor.length} node selected`);
                        } else {
                            this.error(`no param`);
                            return;
                        }
                        break;
                    case "click":
                        if (this.$cursor && this.$cursor.length) {
                            this.log(`Clicking on ${this.cursorSelector}`);
                            this.click();
                        } else {
                            this.error(`selector ${this.cursorSelector} select nothing`);
                            return;
                        }
                        break;
                    case "val":
                        if (this.$cursor && this.$cursor.length) {
                            if (param) {
                                this.log(`Setting input with value ${param}`);
                                this.val(param);
                            } else {
                                this.error(`no param`);
                                return;
                            }
                        } else {
                            this.error(`selector ${this.cursorSelector} select nothing`);
                            return;
                        }
                    case "wait":
                        if (param) {
                            this.log(`Waiting for ${param}ms`);
                            this.wait(param);
                        } else {
                            this.error(`no param`);
                            return;
                        }
                        break;
                    default:
                        this.error(`command ${command}`)
                        return;
                }
            }
        }
    },
    select: function(param) {
        this.cursorSelector = param;
        this.$cursor = $(`${param}`);
        return this.$cursor;
    },
    selectEval: function(param) {
        this.cursorSelector = param;
        this.$cursor = eval(param);
        return this.$cursor;
    },
    click: function() {
        this.$cursor.click();
    },
    val: function(param) {
        this.$cursor.val(`${param}`);
    },
    wait: function(param) {
        const end = Date.now() + parseInt(param);
        while (Date.now() < end) {}
    },
    log: function(message) {
        console.log(`${message}`);
    },
    error: function(message) {
        console.error(`/!\\ Error : ${message}`);
        this.error = message;
    }
}