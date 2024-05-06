socket.on('userGroups', (groups) => {
    groups.forEach(group => {
        CreateGroup(group);
    });
});