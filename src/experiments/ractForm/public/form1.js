return modules.React.createElement(modules.MetaForm, {
    key: 1,
    caption: "My 2nd form",
    data: props.data,
    schema: props.schema,
    actions: props.actions
}, [
    modules.React.createElement(modules.MetaSection, {
        key: 1,
        caption: "Patient Demographic1"
    }, [
        modules.React.createElement(modules.MetaField, {
            key: 1,
            caption: "Last Name",
            valuePath: "patient.lastName"
        }, null)
    ])
]);