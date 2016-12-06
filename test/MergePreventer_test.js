const expect = require("chai").expect;
const sinon = require("sinon");
const MergePreventer = require("../src/MergePreventer");

describe("MergePreventer", function() {
    describe("#getStatusUrl", function() {
        it("should return the correct URL", function() {
            var client = {};
            var preventer = new MergePreventer(client, "mheap", "hold-your-horses", "shhhaaaa1");
            expect(preventer.getStatusUrl()).to.equal('/repos/mheap/hold-your-horses/statuses/shhhaaaa1');
        });

        it("should make a request to the provided client", function() {
            var client = {
                "post": sinon.spy()
            }
            var preventer = new MergePreventer(client, "mheap", "hold-your-horses", "shhhaaaa1");
            preventer.setPending();
            expect(client.post.calledOnce).to.be.true;
        });
    });
});
