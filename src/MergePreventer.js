var __ = function(client, owner, repo, sha){
    this.client = client;
    this.owner = owner;
    this.repo = repo;
    this.sha = sha;
};

__.prototype.getStatusUrl = function() {
    return '/repos/' + this.owner + '/' + this.repo + '/statuses/' + this.sha;
};

__.prototype.setState = function(state, cb) {
    this.client.post(this.getStatusUrl(), {"json": true, "body": {
        "state": state,
        "context": "Hold Your Horses",
        "description": "Leave it a little while before merging this PR to give others a chance to look at it"
    }, function(err, httpResponse, body) {
        return cb(err, httpResponse, body);
    }});
};

__.prototype.setPending = function() {
    return this.setState("pending");
};

__.prototype.setSuccess = function() {
    return this.setState("success");
};

module.exports = __;

