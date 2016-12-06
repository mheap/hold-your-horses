const expect = require("chai").expect;
const sinon = require("sinon");
const request = require("request");
const MergePreventer = require("../src/MergePreventer");

describe("MergePreventer", function() {
    beforeEach(function(done){
        this.clock = sinon.useFakeTimers();
        done();
    });

    afterEach(function(done){
        this.clock.restore();
        done();
    });

    describe("#getStatusUrl", function() {
        it("should return the correct URL", function() {
            var client = {};
            var preventer = new MergePreventer(client, "ghTOKEN", "mheap", "hold-your-horses", "shhhaaaa1");
            expect(preventer.getStatusUrl()).to.equal('/repos/mheap/hold-your-horses/statuses/shhhaaaa1');
        });

    });

    describe("#trigger", function() {
        it("Should call pending, but not success before the timeout", function() {
            var preventer = new MergePreventer(request, "ghTOKEN",  "mheap", "hold-your-horses", "shhhaaaa1");

            var mock = sinon.mock(preventer);
            mock.expects("setPending").once();
            mock.expects("setSuccess").never();

            preventer.trigger(100);
            this.clock.tick(80);

            mock.verify();
        });

        it("Should call pending, then success after specified timeout", function() {
            var preventer = new MergePreventer(request, "ghTOKEN", "mheap", "hold-your-horses", "shhhaaaa1");

            var mock = sinon.mock(preventer);
            mock.expects("setPending").once();
            mock.expects("setSuccess").once();

            preventer.trigger(100);
            this.clock.tick(100);

            mock.verify();
        });
    });

    describe("#setPending", function() {
        it("should make a request to the provided client", function() {
            var mock = sinon.mock(request);

            mock.expects("post").once().withArgs(
                'https://api.github.com/repos/mheap/hold-your-horses/statuses/shhhaaaa1',
                {
                    "json": true,
                    "body": {
                        "state": "pending",
                        "context": "Hold Your Horses",
                        "description": "Leave it a little while before merging this PR to give others a chance to look at it"
                    },
                    "headers": {
                        "User-Agent": "MergePreventer/1.0",
                        "Authorization": "token ghTOKEN"
                    }
                }
            );

            var preventer = new MergePreventer(request, "ghTOKEN", "mheap", "hold-your-horses", "shhhaaaa1");
            preventer.setPending();

            mock.verify();
        });
    });

    describe("#setSuccess", function() {
        it("should make a request to the provided client", function() {
            var mock = sinon.mock(request);

            mock.expects("post").once().withArgs(
                'https://api.github.com/repos/mheap/hold-your-horses/statuses/shhhaaaa1',
                {
                    "json": true,
                    "body": {
                        "state": "success",
                        "context": "Hold Your Horses",
                        "description": "Leave it a little while before merging this PR to give others a chance to look at it"
                    },
                    "headers": {
                        "User-Agent": "MergePreventer/1.0",
                        "Authorization": "token ghTOKEN"
                    }
                }
            );

            var preventer = new MergePreventer(request, "ghTOKEN", "mheap", "hold-your-horses", "shhhaaaa1");
            preventer.setSuccess();

            mock.verify();
        });
    });
});
