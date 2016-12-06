var __ = function(client, gh_token, owner, repo, sha){
    this.client = client;
    this.github_token = gh_token;
    this.owner = owner;
    this.repo = repo;
    this.sha = sha;

    this.githubUrl = "https://api.github.com";
};

__.prototype.getStatusUrl = function() {
    return '/repos/' + this.owner + '/' + this.repo + '/statuses/' + this.sha;
};

__.prototype.trigger = function(timeout, pendingCb, successCb){
    this.setPending(pendingCb);
    var s = setTimeout(function(){
        this.setSuccess(successCb)
    }.bind(this), timeout);
};

__.prototype.setState = function(state, cb) {
    this.client.post(this.githubUrl + this.getStatusUrl(), {"json": true, "body": {
        "state": state,
        "context": "Hold Your Horses",
        "description": "Leave it a little while before merging this PR to give others a chance to look at it"
    }, "headers": {
        "User-Agent": "MergePreventer/1.0",
        "Authorization": "token " + this.github_token
    }}, function(err, httpResponse, body) {
        if (typeof cb === "function"){
            return cb(err, httpResponse, body);
        }
    });
};

__.prototype.setPending = function(cb) {
    return this.setState("pending", cb);
};

__.prototype.setSuccess = function(cb) {
    return this.setState("success", cb);
};

module.exports = __;

