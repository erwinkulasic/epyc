
function onError(req, res) {
    res.statusCode = 500;

    res.end(
        JSON.stringify(
            { error: "Internal Server Error", url: req.url, message: "Something went wrong", status: res.statusCode }
        )
    );
}

function prepareExport(instance, struct) {
    const __proto = instance;
    Object.assign(__proto.prototype, struct);

    return __proto;
}

module.exports = { onError, prepareExport };