var userAgent = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

if (isMobile) {
    NetFunnel_Action({
        action_id: "index_M",
        use_mobile_ui: "true",
        skin_id: "default"
    }, function(ev,ret){})
} else {
    NetFunnel_Action({
        action_id: "index_W",
        use_mobile_ui: "true",
        skin_id: "default"
    }, function(ev,ret){})
}
