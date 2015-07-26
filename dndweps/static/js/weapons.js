var WeaponBox = React.createClass({
    render: function() {
        return (<div className="container">
            <h1 className="text-center">Weapons</h1>
            <WeaponForm submitCallback={this.getWeaponsFromServer} />
            <WeaponList weapons={this.state.weapons} />
        </div>);
    },

    getInitialState: function() {
        return {weapons: []};
    },

    getWeaponsFromServer: function(weapons, attributes) {
         $.ajax({
            url: this.props.url,
            data: {weps: weapons.toString(), props: attributes.toString()},
            type: 'GET',
            success: function(data) {
                this.setState(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        }); 
    },

    componentDidMount: function() {
        this.getWeaponsFromServer(3, 2)
    }
});


var WeaponList = React.createClass({
    render: function() {
        var weapons = this.processWeapons(this.props.weapons);
        return (
            <ul className="list-unstyled weapon-list">
                {weapons}
            </ul>
        );
    },

    processWeapons: function(weapons) {
        return weapons.map(function(wep) {
            return (<li><Weapon name={wep.name} attrs={wep.attributes} /></li>);
        });
    }
});


var Weapon = React.createClass({
    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2 className="text-center">{this.props.name}</h2>
                </div>
                <div className="panel-body">
                    <AttributeList attributes={this.props.attrs} />
                </div>
            </div>
        );
    }
});


var WeaponForm = React.createClass({
    render: function() {
        return (
            <div className="container" id="weaponForm">
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <input type="text" placeholder="How many weapons?" className="form-control input-sm" ref="weps" />
                    <input type="text" placeholder="How many attributes?" className="form-control input-sm" ref="attrs" />
                    <button className="btn btn-primary btn-sm" type="submit">Loot the server!</button>
                </form>
            </div>
            ); 
    },

    handleSubmit: function(f) {
        f.preventDefault();
        var num_weps = parseInt(React.findDOMNode(this.refs.weps).value.trim());
        var num_attrs = parseInt(React.findDOMNode(this.refs.attrs).value.trim());

        if (!num_weps || !num_attrs) { return; }

        this.props.submitCallback(num_weps, num_attrs)

        React.findDOMNode(this.refs.weps).value = '';
        React.findDOMNode(this.refs.attrs).value = '';
        return;
    }
});


var AttributeList = React.createClass({
    processAttributes: function(attrs) {
        return attrs.map(function(attr) {
            return (<li><span>{attr}</span></li>);
        })
    },

    render: function() {
        var attrs = this.processAttributes(this.props.attributes);
        return (
            <ul className="attribute-list">
            {attrs}
            </ul>
        );
    }
});


React.render(<WeaponBox url="api/weapons" />, document.getElementById('weapons'));
