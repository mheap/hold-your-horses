const expect = require("chai").expect;
const HookReceiver = require("../src/HookReceiver");

describe("HookReceiver", function() {
    var minimalReceiver = new HookReceiver({
        "pull_request": {
            "head": {
                "repo": {
                    "owner": {
                        "login": "mheap"
                    },
                    "name": "hold-your-horses"
                },
                "sha": "1c18967c9772871659ca5e775df3a7e2"
            }
        }
    });

    var fullReceiver = new HookReceiver(require(__dirname + "/data/webhook.json"));

    describe("#constructor", function() {
        it("should return an Error if the path pull_request does not exist", function() {
            expect(function(){
                new HookReceiver({});
            }).to.throw(Error, "Missing pull_request key");
        });

        it("should return an Error if the path pull_request.head does not exist", function() {
            expect(function(){
                new HookReceiver({
                    "pull_request": {
                    }
                });
            }).to.throw(Error, "Missing head key");
        });

        it("should return an Error if the path pull_request.repo does not exist", function() {
            expect(function(){
                new HookReceiver({"pull_request": {"head": {}}});
            }).to.throw(Error, "Missing head.repo key");
        });

        it("should return an Error if the path pull_request.repo.owner does not exist", function() {
            expect(function(){
                new HookReceiver({"pull_request": {"head": {"repo":{}}}});
            }).to.throw(Error, "Missing head.repo.owner key");
        });

        it("should return an Error if the path pull_request.repo.name does not exist", function() {
            expect(function(){
                new HookReceiver({"pull_request": {"head": {"repo":{"owner": {}}}}});
            }).to.throw(Error, "Missing head.repo.name key");
        });

        it("should return an Error if the path pull_request.head.sha does not exist", function() {
            expect(function(){
                new HookReceiver({
                    "pull_request": {
                        "head": {
                            "repo":{"name": {}, "owner":{}}
                        }
                    }
                });
            }).to.throw(Error, "Missing head.sha key");
        });
    });

    describe("#getOwner", function() {
        it("should return repo.owner.login - minimal", function() {
            expect(minimalReceiver.getOwner()).to.equal("mheap");
        });

        it("should return repo.owner.login - full", function() {
            expect(fullReceiver.getOwner()).to.equal("baxterthehacker");
        });
    });

    describe("#getRepo", function() {
        it("should return repo.name - minimal", function() {
            expect(minimalReceiver.getRepo()).to.equal("hold-your-horses");
        });
        it("should return repo.name - full", function() {
            expect(fullReceiver.getRepo()).to.equal("public-repo");
        });
    });

    describe("#getSha", function() {
        it("should return head.sha - minimal", function() {
            expect(minimalReceiver.getSha()).to.equal("1c18967c9772871659ca5e775df3a7e2");
        });
        it("should return head.sha", function() {
            expect(fullReceiver.getSha()).to.equal("0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c");
        });
    });
});
