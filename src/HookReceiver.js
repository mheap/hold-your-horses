var __ = function(payload){
    this.validatePayload(payload.pull_request);
    this.payload = payload.pull_request;
}

__.prototype.validatePayload = function(payload) {
    if (payload === undefined) {
        throw new Error("Missing pull_request key");
    }

    if (payload.head === undefined) {
        throw new Error("Missing head key");
    }

    if (payload.head.repo === undefined) {
        throw new Error("Missing head.repo key");
    }

    if (payload.head.repo.owner === undefined) {
        throw new Error("Missing head.repo.owner key");
    }

    if (payload.head.repo.name === undefined) {
        throw new Error("Missing head.repo.name key");
    }

    if (payload.head.sha === undefined) {
        throw new Error("Missing head.sha key");
    }
}

__.prototype.getOwner = function() {
    return this.payload.head.repo.owner.login;
}

__.prototype.getRepo = function() {
    return this.payload.head.repo.name;
}

__.prototype.getSha = function() {
    return this.payload.head.sha;
}

module.exports = __;
