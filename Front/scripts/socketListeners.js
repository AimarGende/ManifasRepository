socket.on('userGroups', (groups) => {
    groups.forEach(group => {
        GroupContainer(group);
    });
});