const expect = require("chai").expect;
const HookReceiver = require("../src/HookReceiver");

describe("HookReceiver", () => {
    describe("#hello", () => {
        it("should default to world", () => {
            var rec = new HookReceiver();
            expect(rec.hello()).to.equal("Hello World");
        });

        it("should accept a name parameter", () => {
            var rec = new HookReceiver();
            expect(rec.hello("Michael")).to.equal("Hello Michael");
        });
    });
});
