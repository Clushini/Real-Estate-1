const api = {
    searchAssets: (payload, cb) => {
        fetch('/Home/SearchAssets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8', },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(result => {
                console.log('<searchAssets> response', result);
                cb(null, result);
            });
    },
    getUserCompanies: cb => {
        fetch('/Home/GetUserCompanies', {
            method: 'POST',
        })
            .then(res => res.json())
            .then(result => {
                console.log('<getUserCompanies> response', result);
                cb(null, result);
            });
    },
    doesUserCompanyExist: (payload, cb) => {
        // I failed to find existing duplicate logic for OC/HC, so
        // just check company name for now, add more/less later
        fetch('/Home/DoesUserCompanyExist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8', },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(result => {
                console.log('<doesUserCompanyExist> response', result);
                cb(null, result);
            });
    },
    createUserCompany: (payload, cb) => {
        fetch('/Home/CreateUserCompany', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8', },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(result => {
                console.log('<createUserCompany> response', result);
                cb(null, result);
            });
    },
  updateUserCompany: (payload, cb) => {
    fetch('/Home/UpdateUserCompany', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(result => {
      console.log('<updateUserCompany> response', result);
      cb(null, result);
    });
  },
    createAsset: (payload, cb) => {

        fetch('/Home/CreateAsset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8', },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(result => {
                console.log('<createAsset> response', result);
                cb(null, result);
            });
    },
  claimAsset: (payload, cb) => {
    fetch('/Home/ClaimAsset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(result => {
      console.log('<createAsset> response', result);
      cb(null, result);
    });
  },
  uploadFilesForNewlyCreatedAsset: (payload, cb) => {
    fetch('/Home/UploadCreateAssetDocs', {
      method: 'POST',
      body: payload,
    })
    .then(res => res.json())
    .then(result => {
      console.log('<uploadFilesForNewlyCreatedAsset> response', result);
      cb(null, result);
    });
  },
  uploadFilesForClaimAsset: (payload, cb) => {
    fetch('/Home/UploadClaimAssetDocs', {
      method: 'POST',
      body: payload,
    })
    .then(res => res.json())
    .then(result => {
      console.log('<uploadFilesForClaimAsset> response', result);
      cb(null, result);
    });
  },
    uploadFile: (files, type) => {

        if (files.length === 1) {
            if (files[0].name.split(".").pop().toLowerCase() === 'pdf') {
                console.log(files[0].size);
                if (files[0].size <= 25000000) {
                    //doc0 = files[0];
                    var success;
                    switch (type) {
                        case 'Title Insurance Policy':
                            api.tempGlobal.docTitleInsurancePolicy = files[0];
                            success = true;
                            break;
                        case 'Vesting Deed':
                            api.tempGlobal.docVestingDeed = files[0];
                            success = true;
                            break;
                        case 'State Documentation':
                            api.tempGlobal.docStateDocumentation = files[0];
                            success = true;
                            break;
                        case 'Other':
                            api.tempGlobal.docOther = files[0];
                            success = true;
                            break;
                        case 'om':
                            api.tempGlobal.docOm = files[0];
                            success = true;
                            break;
                        default:
                            alert('we currently do not support document type ' + event.target.getAttribute('data-type'))
                            break;
                    }
                    if (success) {
            console.log(`Successfully uploaded ${event.target.getAttribute('data-type')} document`);
                    }

                } else {
                    alert('File cannot be larger than 25mb');
                }
            } else {
                alert('invalid file format!');
            }
        } else {
            alert('Only select one file por favor.')
        }
    },
    tempGlobal: {
        operating: [],
        holding: [],
        assets: [], // for multi asset claiming????
        claimedAsset: null,
        newAsset: null,
        docTitleInsurancePolicy: null,
        docVestingDeed: null,
        docStateDocumentation: null,
        docOther: null,
        docOm: null,
        sellerTerms: [
            { id: 1, val: 'All Cash – no PMF' },
            { id: 2, val: 'Cash & PMF' },
            { id: 3, val: 'Cash & Assumption of existing Debt Package' },
            { id: 4, val: 'Cash & Seller Carryback with Assumption of Existing Debt Package' },
            { id: 5, val: 'Cash & Seller Carryback (Property was F&C of any Debt Package)' },
            { id: 6, val: 'Submit Proposal' },
            { id: 7, val: 'Cash & Property for Property 1031 Exchange' },
            { id: 8, val: 'Property for Property 1031 Exchange – No Cash Transfer' },
            { id: 9, val: 'Other' },
    ],
    operatingMap: {
      'Id': 'Id',
      'CompanyName': 'Operating Company',
      'FirstName': 'Operating Company E-mail',
      'LastName': 'Officer First Name',
      'Email': 'Officer Last Name',
      'AddressLine1': 'Address',
      'AddressLine2': 'Address 2',
      'City': 'City',
      'State': 'State',
      'Zip': 'Zip Code',
      'Country': 'Country',
      'CellNumber': 'Cell Number',
      'WorkNumber': 'Work Number',
      'FaxNumber': 'Fax Number',
    },
    holdingMap: {
      'Id': 'Id',
      'CompanyName': 'Contract Owner',
      'FirstName': 'Officer First Name',
      'LastName': 'Officer Last Name',
      'Email': 'E-Mail',
      'AddressLine1': 'Address',
      'AddressLine2': 'Address 2',
      'City': 'City',
      'State': 'State',
      'Zip': 'Zip Code',
      'Country': 'Country',
      'CellNumber': 'Cell Number',
      'WorkNumber': 'Work Number',
      'FaxNumber': 'Fax Number',
    }
    }
};

class LO extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directory: [
                { page: "home", subpages: [], link: "/", showsub: false, highlighted: false },
                { page: "cre asset search", subpages: [], link: "/DataPortal/AssetSearchView", showsub: false, highlighted: false },
                { page: "principal investor introduction", subpages: [], link: "/Home/RegistrationIntro", showsub: false, highlighted: false },
                { page: "service provider introduction", subpages: [], link: "/Home/JointVentureMarketing", showsub: false, highlighted: false },
                { page: "Independent Contractor Employment Opportunity", subpages: [], link: "/Home/EmploymentOpportunities", showsub: false, highlighted: false },
                { page: "uscre: global data portal", subpages: [], link: "/DataPortal/DataPortal", showsub: false, highlighted: false },
                { page: "Global Service Provider Database", subpages: [], link: "/ServiceProviders/SearchServiceProviders", showsub: false, highlighted: false },
                { page: "Global CRE Membership Organizations", subpages: [], link: "/Home/Affiliations", showsub: false, highlighted: false }
            ],
            currentpage: ""
        }

        this.showSub = this.showSub.bind(this);
    }

    showSub(index) {

        let copyarr = [...this.state.directory];
        copyarr[index].showsub = !copyarr[index].showsub;
        this.setState({
            directory: copyarr
        });
        this.props.getpage(copyarr[index].page, copyarr[index].link);
    }

    componentDidMount() {
        for (let i = 0; i < this.state.directory.length; i++) {
            let copystate = Object.assign({}, this.state);
            if (copystate.directory[i].link === window.location.pathname) {
                console.log(copystate.directory[i].link);
                console.log(window.location.pathname);
                copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
            }
            if (this.state.directory[i].subpages.length > 0) {
                this.state.directory[i].subpages.map((item, index) => {
                    if (item.link === window.location.pathname) {
                        copystate.directory[i].subpages[index].highlighted = !copystate.directory[i].subpages[index].highlighted;
                        copystate.directory[i].showsub = !copystate.directory[i].showsub;
                        copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
                    }
                })
            }
            this.setState(copystate);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.directory.map((tab, index) => {
                        let style = { fontSize: '13px' };
                        if (tab.page.length > 25) {
                            style = { fontSize: '13px' };
                            console.log(tab.page.length);
                        }
                        if (tab.page.length > 32) {
                            style = { fontSize: '13px', lineHeight: '16px', paddingTop: '16px' };
                            console.log(tab.page.length);
                        }
                        return <div key={tab.page}>
                            <div className={(tab.highlighted) ? "mainbuttonwrap navselected" : "mainbuttonwrap"} style={style} key={tab.page} onClick={() => this.showSub(index)}>{tab.page.toUpperCase()}</div>
                            {(tab.subpages.length > 0)
                                &&
                                <div className={(this.state.directory[index].showsub) ? "" : "hidden"}>{
                                    tab.subpages.map(subtab => {
                                        return <div className={(subtab.highlighted) ? "subbuttonwrap navselected" : "subbuttonwrap"} key={subtab.page} onClick={() => this.props.getpage(tab.page, subtab.link, subtab.page)}>{subtab.page.toUpperCase()}</div>
                                    })
                                }</div>
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}


class SP extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directory: [
                { page: "dashboard", subpages: [], link: "/ServiceProviders/Dashboard", showsub: false, highlighted: false },
                { page: "Joint Venture Marketing Program Introduction", subpages: [], link: "/Home/JointVentureMarketing", showsub: false, highlighted: false },
                { page: "communication center", subpages: [], link: "/ServiceProviders/CommunicationCenter", showsub: false, highlighted: false },
                { page: "document center", subpages: [], link: "/ServiceProviders/ManageUploads", showsub: false, highlighted: false },
                { page: "global service provider database", subpages: [], link: "/ServiceProviders/SearchServiceProviders", showsub: false, highlighted: false },
                { page: "global cre membership organizations", subpages: [], link: "/Home/Affiliations", showsub: false, highlighted: false }
            ],
            currentpage: ""
        }

        this.showSub = this.showSub.bind(this);
    }

    showSub(index) {
        let copyarr = [...this.state.directory];
        copyarr[index].showsub = !copyarr[index].showsub;
        this.setState({
            directory: copyarr
        });
        this.props.getpage(copyarr[index].page, copyarr[index].link);
    }


    componentWillMount() {
        fetch('/Home/IsUserInJVMP')
            .then(res => res.json())
            .then(result => {
                if (result.IsInJVMP) {
                    //console.log("is in jvmp program");
                    let copyState = Object.assign({}, this.state);

                    copyState.directory[1] = { page: "Referrals", subpages: [{ page: "Monitoring", link: "/referral/referraltracking", highlighted: false }, { page: "Activity", link: "/serviceproviders/PIManagement", highlighted: false }, { page: "Accounting", link: "#", highlighted: false }], link: "#", showsub: false, highlighted: false };
                    this.setState({ directory: copyState.directory });
                }
            });
    }

    componentDidMount() {

        for (let i = 0; i < this.state.directory.length; i++) {
            let copystate = Object.assign({}, this.state);
            if (copystate.directory[i].link === window.location.pathname) {
                console.log(copystate.directory[i].link);
                console.log(window.location.pathname);
                copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
            }
            if (this.state.directory[i].subpages.length > 0) {
                this.state.directory[i].subpages.map((item, index) => {
                    if (item.link === window.location.pathname) {
                        copystate.directory[i].subpages[index].highlighted = !copystate.directory[i].subpages[index].highlighted;
                        copystate.directory[i].showsub = !copystate.directory[i].showsub;
                        copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
                    }
                })
            }
            this.setState(copystate);
        }
    }

    render() {
        //console.log(this.state);
        return (
            <div>
                {
                    this.state.directory.map((tab, index) => {
                        let style = { fontSize: '13px' };
                        if (tab.page.length > 25) {
                            style = { fontSize: '13px' };
                            //console.log(tab.page.length);
                        }
                        if (tab.page.length > 32) {
                            style = { fontSize: '13px', lineHeight: '16px', paddingTop: '16px' };
                            //console.log(tab.page.length);
                        }
                        return <div key={tab.page}>
                            <div className={(tab.highlighted) ? "mainbuttonwrap navselected" : "mainbuttonwrap"} style={style} key={tab.page} onClick={() => this.showSub(index)}>{tab.page.toUpperCase()}</div>
                            {(tab.subpages.length > 0)
                                &&
                                <div className={(this.state.directory[index].showsub) ? "" : "hidden"}>{
                                    tab.subpages.map(subtab => {
                                        return <div className={(subtab.highlighted) ? "subbuttonwrap navselected" : "subbuttonwrap"} key={subtab.page} onClick={() => this.props.getpage(tab.page, subtab.link, subtab.page)}>{subtab.page.toUpperCase()}</div>
                                    })
                                }</div>
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

class ICA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directory: [
                { page: "my cache", subpages: [{ page: "current cache", link: "/ICA/ICACache", highlighted: false }, { page: "manage portfolios", link: "/Portfolio/ManagePortfolios", highlighted: false }], link: "#", showsub: false, highlighted: false },
                { page: "create asset", subpages: [], link: "#", showsub: false, highlighted: false },
                { page: "extract images", subpages: [], link: "/Admin/ExtractImagesFromBrochure", showsub: false, highlighted: false },
                { page: "accounting", subpages: [], link: "/Admin/ICAccountingReportDisplay", showsub: false, highlighted: false }
            ],
            currentpage: ""
        }

        this.showSub = this.showSub.bind(this);
    }

    showSub(index) {
        let copyarr = [...this.state.directory];
        copyarr[index].showsub = !copyarr[index].showsub;
        this.setState({
            directory: copyarr
        });
        this.props.getpage(copyarr[index].page, copyarr[index].link);
    }

    componentDidMount() {
        for (let i = 0; i < this.state.directory.length; i++) {
            let copystate = Object.assign({}, this.state);
            if (copystate.directory[i].link === window.location.pathname) {
                copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
            }
            if (this.state.directory[i].subpages.length > 0) {
                this.state.directory[i].subpages.map((item, index) => {
                    if (item.link === window.location.pathname) {
                        copystate.directory[i].subpages[index].highlighted = !copystate.directory[i].subpages[index].highlighted;
                        copystate.directory[i].showsub = !copystate.directory[i].showsub;
                        copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
                    }
                })
            }
            this.setState(copystate);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.directory.map((tab, index) => {
                        let style = { fontSize: '13px' };
                        if (tab.page.length > 25) {
                            style = { fontSize: '13px' };
                            console.log(tab.page.length);
                        }
                        if (tab.page.length > 32) {
                            style = { fontSize: '13px', lineHeight: '16px', paddingTop: '16px' };
                            console.log(tab.page.length);
                        }
                        return <div key={tab.page}>
                            <div className={(tab.highlighted) ? "mainbuttonwrap navselected" : "mainbuttonwrap"} style={style} key={tab.page} onClick={() => this.showSub(index)}>{tab.page.toUpperCase()}</div>
                            {(tab.subpages.length > 0)
                                &&
                                <div className={(this.state.directory[index].showsub) ? "" : "hidden"}>{
                                    tab.subpages.map(subtab => {
                                        return <div className={(subtab.highlighted) ? "subbuttonwrap navselected" : "subbuttonwrap"} key={subtab.page} onClick={() => this.props.getpage(tab.page, subtab.link, subtab.page)}>{subtab.page.toUpperCase()}</div>
                                    })
                                }</div>
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

class PI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directory: [
                { page: "dashboard", subpages: [], link: "/Home/MyUSCPage", showsub: false, highlighted: false },
                { page: "my inventory", subpages: [{ page: "assets", link: "/Investors/SellerManageAssets", highlighted: false }, { page: "portfolio", link: "/Portfolio/ManagePortfolios", highlighted: false }, { page: "create asset", link: "#", highlighted: false }], link: "#", showsub: false, highlighted: false },
                { page: "search", subpages: [{ page: "new search", link: "/DataPortal/AssetSearchView" }, { page: "favorites", link: "/Asset/ManageFavoriteGroups", highlighted: false }, { page: "saved searches", link: "/DataPortal/ManageSavedSearches", highlighted: false }], link: "#", showsub: false, highlighted: false },
                { page: "sales & acquisitions", subpages: [], link: "/ServiceProviders/PortfolioFinancial", showsub: false, highlighted: false },
                { page: "global cre Service Provider Database", subpages: [{ page: "search sps", link: "/ServiceProviders/SearchServiceProviders", highlighted: false }, { page: "my preferred sps", link: "/ServiceProviders/PreferredServiceProviders", highlighted: false }], link: "#", showsub: false, highlighted: false }
            ],
            currentpage: "",
            createasset: false
        }

        this.showSub = this.showSub.bind(this);
    }

    showSub(index) {
        let copyarr = [...this.state.directory];
        copyarr[index].showsub = !copyarr[index].showsub;
        this.setState({
            directory: copyarr
        });
        this.props.getpage(copyarr[index].page, copyarr[index].link);
    }

    componentDidMount() {
        for (let i = 0; i < this.state.directory.length; i++) {
            let copystate = Object.assign({}, this.state);
            if (copystate.directory[i].link === window.location.pathname) {
                copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
            }
            if (this.state.directory[i].subpages.length > 0) {
                this.state.directory[i].subpages.map((item, index) => {
                    if (item.link === window.location.pathname) {
                        copystate.directory[i].subpages[index].highlighted = !copystate.directory[i].subpages[index].highlighted;
                        copystate.directory[i].showsub = !copystate.directory[i].showsub;
                        copystate.directory[i].highlighted = !copystate.directory[i].highlighted;
                    }
                })
            }
            this.setState(copystate);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.directory.map((tab, index) => {
                        let style = { fontSize: '13px' };
                        if (tab.page.length > 25) {
                            style = { fontSize: '13px' };
                            console.log(tab.page.length);
                        }
                        if (tab.page.length > 32) {
                            style = { fontSize: '13px', lineHeight: '16px', paddingTop: '16px' };
                            console.log(tab.page.length);
                        }
                        return <div key={tab.page}>
                            <div className={(tab.highlighted) ? "mainbuttonwrap navselected" : "mainbuttonwrap"} style={style} key={tab.page} onClick={() => this.showSub(index)}>{tab.page.toUpperCase()}</div>
                            {(tab.subpages.length > 0)
                                &&
                                <div className={(this.state.directory[index].showsub) ? "" : "hidden"}>{
                                    tab.subpages.map(subtab => {
                                        return <div className={(subtab.highlighted) ? "subbuttonwrap navselected" : "subbuttonwrap"} key={subtab.page} onClick={() => this.props.getpage(tab.page, subtab.link, subtab.page)}>{subtab.page.toUpperCase()}</div>
                                    })
                                }</div>
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'ICAdmin',
            page: {},
            showPopup: false
        }

        this.getPage = this.getPage.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ showPopup: false });
    }

    getPage(pagename, link, submain) {

        if (submain === "create asset" || pagename === "create asset") {
            this.setState({ showPopup: !this.state.showpopup });
        }
        if (link !== "#") {
            document.location.href = link;
        }
        this.setState({ page: pagename });
    }

    componentDidMount() {
        //need to make api call here, need page type and current page so i can pass it down. promise and switch should do
        // fetch('http://localhost:58131/Home', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     firstParam: 'yourValue',
        //     secondParam: 'yourOtherValue',
        //   })
        // })
        fetch('/Home/GetLoggedInUserType')
            .then(res => res.json())
            .then(result => {
                //console.log(result.UserType);
                this.setState({
                    type: result.UserType
                })
            })
    }

    render() {
        //console.log(this.state.type);
        return (
            <div className="App">
                <div className="navwrap">
                    {(this.state.type === "Investor") && <PI getpage={this.getPage} currentpage={this.state.page} />}
                    {(this.state.type === "" || this.state.type === "CorpAdmin") && <LO getpage={this.getPage} currentpage={this.state.page} />}
                    {(this.state.type === "ServiceProvider") && <SP getpage={this.getPage} currentpage={this.state.page} />}
                    {(this.state.type === "ICAdmin") && <ICA getpage={this.getPage} currentpage={this.state.page} />}
                </div>
                {this.state.showPopup && <ClaimAsset closepop={this.handleClose} />}
            </div>
        );
    }

}


fetch('/Home/GetLoggedInUserType')
    .then(res => res.json())
    .then(result => {
        // console.log(result.UserType);
        if (result.UserType === "CorpAdmin" || result.UserType === "" || result.UserType === "Investor" || result.UserType === "ServiceProvider" || result.UserType === "ICAdmin") {
            ReactDOM.render(<App />, document.getElementById('nav'));
        }
    })





// claim asset


class ClaimAsset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            addasset: {},
            add1: {},
            add2: {},
            add3: {},
            add4: {},
            addsummarydata: {},
            claim1: {},
            claim2: {},
            claim3: {},
            claim4: {},
            claimsummarydata: {}
        }

        this.addInfo = this.addInfo.bind(this);
        this.backStep = this.backStep.bind(this);
        this.goNext = this.goNext.bind(this);
        this.skipStep = this.skipStep.bind(this);
        this.getAddSummary = this.getAddSummary.bind(this);
        this.getClaimSummary = this.getClaimSummary.bind(this);
        this.sendClose = this.sendClose.bind(this);
    }

    sendClose() {
        this.props.closepop()
    }

    goNext(data, page) {
        // Need this to fix the decimal because floating point numbers make computers upset
        // console.log(data);
        // console.log(page);
        console.log(this.state);
        let fixednumber = Number((this.state.step + 0.1).toFixed(1));
        this.setState({ step: fixednumber, [page]: data });
    }

    addInfo(data, type) {
        this.setState({ addasset: data, step: type });
        //console.log(data);
    }

    backStep() {
        if (this.state.step === 1 || this.state.step === 2) {
            this.setState({ step: 0 });
        }
        if (this.state.step % 1 !== 0) {
            // Need this to fix the decimal because floating point numbers make computers upset
            let fixednumber = Number((this.state.step - 0.1).toFixed(1));
            this.setState({ step: fixednumber });
        }
    }

    skipStep() {
        //Same as next, just no data save
        let fixednumber = Number((this.state.step + 0.1).toFixed(1));
        this.setState({ step: fixednumber });
    }

    getAddSummary() {
        let summarydata = {
            'State': this.state.addasset.addasset.State,
            'address': this.state.addasset.addasset.address,
            'apns': this.state.addasset.addasset.apns,
            'assetname': this.state.addasset.addasset.assetname,
            'address': this.state.addasset.addasset.address,
            'city': this.state.addasset.addasset.city,
            'county': this.state.addasset.addasset.county,
            'note': this.state.addasset.addasset.note,
            'type': this.state.addasset.addasset.type,
            'aquisition': this.state.add1.aquisition,
            'purchaseprice': this.state.add1.purchaseprice,
            'holding': this.state.add1.currentholding,
            'operating': this.state.add1.currentoperating
        }
        this.setState({
            addsummarydata: summarydata
        })
    }

    getClaimSummary() {
        //console.log(this.state);
        let summarydata = {
            'State': this.state.addasset.addasset.State,
            'address': this.state.addasset.addasset.address,
            'apns': this.state.addasset.addasset.apns,
            'assetname': this.state.addasset.addasset.assetname,
            'address': this.state.addasset.addasset.address,
            'city': this.state.addasset.addasset.city,
            'county': this.state.addasset.addasset.county,
            'note': this.state.addasset.addasset.note,
            'type': this.state.addasset.addasset.type,
            'aquisition': this.state.claim2.aquisition,
            'purchaseprice': this.state.claim2.purchaseprice,
            'holding': this.state.claim2.currentholding,
            'operating': this.state.claim2.currentoperating
        }
        this.setState({
            claimsummarydata: summarydata
        })
    }

    render() {
        //console.log(this.state);

        return (
            <div className="App">
                <div className="modal_backdrop">
                    {!this.state.step && <Addasset addinfo={this.addInfo} data={this.state.addasset} close={this.sendClose} />}

                    {this.state.step === 1 && <Add1 goback={this.backStep} gonext={this.goNext} data={this.state.add1} />}
                    {this.state.step === 1.1 && <Add2 goback={this.backStep} gonext={this.goNext} data={this.state.add2} />}
                    {this.state.step === 1.2 && <Add3 goback={this.backStep} gonext={this.goNext} data={this.state.add3} skipstep={this.skipStep} />}
                    {this.state.step === 1.3 && <Add4 goback={this.backStep} data={this.state.add4} getsummary={this.getAddSummary} summarydata={this.state.addsummarydata} />}

                    {this.state.step === 2 && <Claim1 goback={this.backStep} gonext={this.goNext} />}
                    {this.state.step === 2.1 && <Claim2 goback={this.backStep} gonext={this.goNext} data={this.state.claim2} />}
                    {this.state.step === 2.2 && <Claim3 goback={this.backStep} gonext={this.goNext} data={this.state.claim3} />}
                    {this.state.step === 2.3 && <Claim4 goback={this.backStep} data={this.state.claim4} getsummary={this.getClaimSummary} summarydata={this.state.claimsummarydata} />}
                </div>
            </div>
        );
    }
}

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
      };

class Ohdrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operating: [
                { 'Operating Company': '' }, { 'Operating Company E-Mail': '' }, { 'Officer First Name': '' }, { 'Officer Last Name': '' }, { 'Address': '' }, { 'Address 2': '' },
                { 'City': '' }, { 'State': '' }, { 'Zip Code': '' }, { 'Country': '' }, { 'Work Number': '' }, { 'Cell Number': '' }, { 'Fax Number': '' }
            ],
            holding: [
                { 'Contract Owner': '' }, { 'E-Mail': '' }, { 'Officer First Name': '' }, { 'Officer Last Name': '' }, { 'Address': '' }, { 'Address 2': '' },
                { 'City': '' }, { 'State': '' }, { 'Zip Code': '' }, { 'Country': '' }, { 'Work Number': '' }, { 'Cell Number': '' }, { 'Fax Number': '' }
            ]
        }

        this.sendClose = this.sendClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
    }
  
    sendClose() {
        this.props.closed();
    }

    handleChange(e, itemindex) {
    var data = [];

        if (this.props.type === "operating") {
            data = [...this.state.operating];
        }

        if (this.props.type === "holding") {
            data = [...this.state.holding];
        }

        data[itemindex] = { [e.target.name]: e.target.value };

    this.setState({[this.props.type]: data});
    }

    saveData() {
    var data = [];

        if (this.props.type === "operating") {
            data = [...this.state.operating];
        }

        if (this.props.type === "holding") {
            data = [...this.state.holding];
        }

        data = this.state[this.props.type];

    this.props.savedata(this.props.type, data);
    }

    updateCompany(e) {
        let selectedindex = e.target.selectedIndex;
        let optionElement = e.target.childNodes[selectedindex];
        let type = optionElement.getAttribute('type');
        // console.log(api.tempGlobal.holding[e.target.value]);
        
        
        if (type === "operating") {
            let companyObject = api.tempGlobal.operating[e.target.value];
            let newOperatingData = [
                { 'Operating Company': companyObject.CompanyName }, { 'Operating Company E-Mail': companyObject.Email }, { 'Officer First Name': companyObject.FirstName }, { 'Officer Last Name': companyObject.LastName }, { 'Address': companyObject.AddressLine1 }, { 'Address 2': companyObject.AddressLine2 },
                { 'City': companyObject.City }, { 'State': companyObject.State }, { 'Zip Code': companyObject.Zip }, { 'Country': companyObject.Country }, { 'Work Number': companyObject.WorkNumber }, { 'Cell Number': companyObject.CellNumber }, { 'Fax Number': companyObject.FaxNumber }
            ]
            this.setState({operating: newOperatingData});
            this.props.updateCurrentOperatingData(newOperatingData, companyObject.CompanyName);
        }

        if (type === "holding") {
            let holdingObject = api.tempGlobal.holding[e.target.value];
            let newHoldingData = [
                { 'Contract Owner': holdingObject.CompanyName }, { 'E-Mail': holdingObject.Email }, { 'Officer First Name': holdingObject.FirstName }, { 'Officer Last Name': holdingObject.LastName }, { 'Address': holdingObject.AddressLine1 }, { 'Address 2': holdingObject.AddressLine2 },
                { 'City': holdingObject.City }, { 'State': holdingObject.State }, { 'Zip Code': holdingObject.Zip }, { 'Country': holdingObject.Country }, { 'Work Number': holdingObject.WorkNumber }, { 'Cell Number': holdingObject.CellNumber }, { 'Fax Number': holdingObject.FaxNumber }
            ]
            this.setState({holding: newHoldingData});
            this.props.updateCurrentHoldingData(newHoldingData, holdingObject.CompanyName);
        }
    }

    componentWillMount() {
        if (api.tempGlobal.operating[0].CompanyName !== "New Operating Company") {
            api.tempGlobal.operating.unshift(
                {
                    "Id": "",
                    "CompanyName": "New Operating Company",
                    "FirstName": "",
                    "LastName": "",
                    "Email": "",
                    "AddressLine1": "",
                    "AddressLine2": "",
                    "City": "",
                    "State": "",
                    "Country": "",
                    "Zip": "",
                    "WorkNumber": "",
                    "CellNumber": "",
                    "FaxNumber": ""
                  }
            );
        }

        if (api.tempGlobal.holding[0].CompanyName !== "New Holding Company") {
            api.tempGlobal.holding.unshift(
                {
                    "Id": "",
                    "CompanyName": "New Holding Company",
                    "FirstName": "",
                    "LastName": "",
                    "Email": "",
                    "AddressLine1": "",
                    "AddressLine2": "",
                    "City": "",
                    "State": "",
                    "Country": "",
                    "Zip": "",
                    "WorkNumber": "",
                    "CellNumber": "",
                    "FaxNumber": ""
                  }
            );
        }
    }

    componentDidMount() {
        if (this.props.currentdata.length > 0) {
            this.setState({ [this.props.type]: this.props.currentdata });
        }
    }

    render() {
        return (
            <div className="ohdrop">
                <div className="topbar topbar_orange ohdrop_title">
                    {(this.props.type === "operating") ? "Operating Company" : "Holding Company"}
                    <div className="closebutton" onClick={this.sendClose}>×</div>
                </div>
                <div className="ohdropcontent">
                    <select onChange={this.updateCompany}>
                        {
                            (this.props.type === "operating")

                                ?

                                api.tempGlobal.operating.map((item, index) => {
                                    if (item.CompanyName === this.props.currentoperatingname) {
                                        return <option value={index} type="operating" key={item.Id} selected>{item.CompanyName}</option>;
                                    }
                                    else {
                                        return <option value={index} type="operating" key={item.Id}>{item.CompanyName}</option>;
                                    }
                                })

                                :

                                api.tempGlobal.holding.map((item, index) => {
                                    if (item.CompanyName === this.props.currentholdingname) {
                                        return <option value={index} type="holding" key={item.Id} selected>{item.CompanyName}</option>;
                                    }
                                    else {
                                        return <option value={index} type="holding" key={item.Id}>{item.CompanyName}</option>;
                                    }
                                })
                        }
                    </select>
                    <h1>
                        <strong>New</strong> Operating Company
                </h1>
                    <div className="ohdropfieldswrap">
                        {
                            (this.props.type === "operating")

                                ?

                                this.state.operating.map(item => {
                                    let itemindex = this.state.operating.indexOf(item);
                                    let key = Object.keys(item)[0];
                                    //console.log(this.state.oc[itemindex][key]);
                                    return <div className="ohdropfield" key={key}><div>{key}</div><input type="text" name={key} value={this.state.operating[itemindex][key]} onChange={(e) => this.handleChange(e, itemindex)} /></div>
                                })

                                :

                                this.state.holding.map(item => {
                                    let itemindex = this.state.holding.indexOf(item);
                                    let key = Object.keys(item)[0];
                                    return <div className="ohdropfield" key={key}><div>{key}</div><input type="text" name={key} value={this.state.holding[itemindex][key]} onChange={(e) => this.handleChange(e, itemindex)} /></div>
                                })
                        }
                    </div>
                    <div className="modalfooter">
                        <div></div>
                        <div className="buttonwrap">
                            <div className="submitbtn smallbtn hvr-float-shadow" style={{width: "auto"}} onClick={this.saveData}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Add1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: 0,
            type: "",
            aquisition: "",
            purchaseprice: "",
            terms: "",
            operating: [],
            holding: [],
            currentoperating: "Operating Company",
            currentholding: "Holding Company"
        }

        this.back = this.back.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showDrop = this.showDrop.bind(this);
        this.hideDrop = this.hideDrop.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveCompanyData = this.saveCompanyData.bind(this);
    }

    nextStep() {
        this.props.gonext(this.state, "add1");
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClose() {
        //close modal here, not sure what we are doing here yet
        this.props.close();
    }

    back() {
        this.props.goback();
    }

    showDrop(type) {
        if (this.state.show) {
            this.setState({ show: 0, type: "" });
        }
        else {
            this.setState({ show: 1, type: type });
        }
    }

    hideDrop(e) {
        this.setState({ show: 0, type: "" });
    }

    componentDidMount() {
        let dataobj = Object.assign({}, this.props.data);
        this.setState(dataobj);
    }

    saveCompanyData(type, data) {
        // This is probably a totally trash way to get the name, maybe fix in future
        let currentname = data[0][Object.keys(data[0])];
        let current = "current" + this.state.type;
        console.log(data);

        if (!currentname) {
            if (this.state.type === "operating") {
                this.setState({ currentoperating: "Operating Company" });
            }
            if (this.state.type === "holding") {
                this.setState({ currentholding: "Holding Company" });
            }
        }
        else {
            this.setState({ [type]: data, [current]: currentname });
        }
    }

    render() {
        let termType = [
            'All Cash - no PMF', 'Cash & PMF', 'Cash & Assumption of existing Debt Package', 'Cash & Seller Carryback with Assumption of Existing Debt Package',
            'Cash & Seller Carryback (Property was F&C of any Debt Package)', 'Cash & Property for Property 1031 Exchange', 'Property for Property 1031 Exchange - No Cash Transfer',
            'Other'
        ];
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Add Asset <a>- Step 1</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1>Please select your Operating Company and Holding Company</h1>
                    <div className="pad40"></div>
                    <div className="dualwrap">
                        <div className="width48">
                            <div className="orangeselect" onClick={() => this.showDrop("operating")}>
                                <div>{this.state.currentoperating}</div><div><img src="./img/downarrow.png" /></div>
                            </div>
                            {(this.state.type === "operating") && <Ohdrop type="operating" savedata={this.saveCompanyData} closed={this.hideDrop} currentdata={this.state.operating} />}
                        </div>
                        <div className="width48">
                            <div className="orangeselect" onClick={() => this.showDrop("holding")}>
                                <div>{this.state.currentholding}</div><div><img src="./img/downarrow.png" /></div>
                            </div>
                            {(this.state.type === "holding") && <Ohdrop type="holding" savedata={this.saveCompanyData} closed={this.hideDrop} currentdata={this.state.holding} />}
                        </div>
                    </div>

                    <div className="dualwrap">
                        <div className="width48">
                            <div className="orangetitle">Original Aquisition Date</div>
                            <input className="orangeselect" type="number" value={this.state.aquisition} onChange={this.handleInput} name="aquisition" />
                        </div>
                        <div className="width48">
                            <div className="orangetitle">Original Purchase Price</div>
                            <input className="orangeselect" type="number" value={this.state.purchaseprice} onChange={this.handleInput} name="purchaseprice" />
                        </div>
                    </div>

                    <div className="width100">
                        <div className="orangetitle">Terms</div>
                        <select className="orangeselect width100" onChange={this.handleInput} name="terms">
                            {
                                api.tempGlobal.sellerTerms.map(item => {
                                    if (item.val === this.state.terms) {
                                        return <option key={item.id} name={item.val} selected>{item.val}</option>
                                    }
                                    else {
                                        return <option key={item.id} name={item.val}>{item.val}</option>
                                    }
                                })
                            }
                        </select>
                    </div>

                    <div className="modalfooter">
                        <div></div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Add2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documents: [{ 'Title Insurance Policy': '' }, { 'Vesting Deed': '' }, { 'State Documentation': '' }, { 'Other': '' }]
        }

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
        if (api.tempGlobal.docTitleInsurancePolicy &&
            api.tempGlobal.docVestingDeed &&
            api.tempGlobal.docStateDocumentation &&
            api.tempGlobal.docOther) {
        this.props.gonext(this.state, "add2");
        } else {
      alert('You didnt upload all the required documents! SHAME!!!!');
        }
    this.props.gonext(this.state, "add2");
    }

    handleFileUpload(files) {
        api.uploadFile(files, event.target.getAttribute('data-type'));
    }
    handleDragOver() {
        event.stopPropagation();
        event.preventDefault();
    }

    handleDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        api.uploadFile(event.dataTransfer.files, event.target.getAttribute('data-type'));
    }

    render() {
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Add Asset <a>- Step 2</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1 className="h1bigfont">Please upload your proof of title documents here</h1>
                    <h2 className="h1bigfont">Maximum upload size 25MB</h2>
                    <div className="pad40"></div>
                    <div className="flexwrap_spacebetween">
                        {
                            this.state.documents.map(item => {
                                let key = Object.keys(item)[0];
                                return <div key={key}>
                                    <h3>{key}</h3>
                                    <div
                                        className="uploadwrap"
                                        draggable="true"
                                        data-type={key}
                                        onDragOver={this.handleDragOver}
                                        onDrop={this.handleDrop}>
                                        <div>Drag & Drop Files Here</div>
                                        <input type="file" data-type={key} onChange={(e) => this.handleFileUpload(e.target.files)} />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="modalfooter">
                        <div>

                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Add3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.skipStep = this.skipStep.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
        if (api.tempGlobal.docOm) {
      this.props.gonext(this.state, "add3");
        } else {
      alert('upload offering memorandum please.')
        }
    this.props.gonext(this.state, "add3");
    }

    skipStep() {
        this.props.skipstep();
    }

    handleFileUpload(files) {
        api.uploadFile(files, event.target.getAttribute('data-type'));
    }
    handleDragOver() {
        event.stopPropagation();
        event.preventDefault();
    }

    handleDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        api.uploadFile(event.dataTransfer.files, event.target.getAttribute('data-type'));
    }

    render() {
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Add Asset <a>- Step 3</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1 className="h1smallfont">
                        Let us do the work for you! Upload your Asset's Offering Memorandum and we will populate your new Asset File at no charge. We will notify you when it’s ready.
              </h1>
                    <h2 className="h1bigfont">Maximum upload size 25MB per Document</h2>
                    <div className="pad40"></div>
                    <div className="flexwrap_center">
                        <div>
                            <h3>OM</h3>
                            <div
                                className="uploadwrap"
                                draggable="true"
                                data-type="om"
                                onDragOver={this.handleDragOver}
                                onDrop={this.handleDrop}>
                                <div>Drag & Drop Files Here</div>
                                <input type="file" data-type="om" onChange={(e) => this.handleFileUpload(e.target.files)} />
                            </div>
                        </div>
                    </div>
                    <div className="modalfooter">
                        <div>
                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn submitgrey top20 hvr-float-shadow" onClick={this.skipStep}>Skip</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Add4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
    //this.props.gonext(this.state, "add3");
    /*let payload = new FormData();
    payload.append('AssetName', this.props.summarydata.assetname)
    //payload.append('AssetType', this.props.summarydata.assettype)
    payload.append('City', this.props.summarydata.city)
    payload.append('State', this.props.summarydata.state)
    payload.append('Address1', this.props.summarydata.address)
    payload.append('County', this.props.summarydata.county)
    payload.append('IsNote', this.props.summarydata.note)
    payload.append('HoldingCompanyId', this.props.summarydata.holding)
    payload.append('OperatingCompanyId', this.props.summarydata.operating)
    payload.append('Apns', this.props.summarydata.apns)
    payload.append('DocumentTitleInsurancePolicy', this.props.summarydata.docTitleInsurancePolicy)
    payload.append('DocumentVestingDeed', this.props.summarydata.docVestingDeed)
    payload.append('DocumentStateDocumentation', this.props.summarydata.docStateDocumentation)
    payload.append('DocumentOther', this.props.summarydata.docOther)
    payload.append('DocumentOfferingMemorandum', this.props.summarydata.docOm)*/

    let payload = {
      AssetName: this.props.summarydata.assetname,
      AssetType: parseInt(this.props.summarydata.type),
      City: this.props.summarydata.city,
      State: this.props.summarydata.State,
      Address1: this.props.summarydata.address,
      County: this.props.summarydata.county,
      IsNote: this.props.summarydata.note,
      //HoldingCompanyId: this.props.summarydata.holding,
      //OperatingCompanyId: this.props.summarydata.operating,
      Apns: this.props.summarydata.apns.map(apn => apn.value),
    }
    console.log('create asset payload', payload);
    api.createAsset(payload, (err, result) => {
      if (err) throw err;
      else {
        if (result.success) {
          alert('successfully created asset');
          let docPayload = new FormData();
          docPayload.append('assetId', result.assetId);
          docPayload.append('stateDocumentation', api.tempGlobal.docStateDocumentation);
          docPayload.append('vestingDeed', api.tempGlobal.docVestingDeed);
          docPayload.append('titleInsurancePolicy', api.tempGlobal.docTitleInsurancePolicy);
          docPayload.append('other', api.tempGlobal.docOther);
          docPayload.append('om', api.tempGlobal.docOm);

          api.uploadFilesForNewlyCreatedAsset(docPayload, (docErr, docResult) => {
            if (docErr) throw docErr;
            else {
              console.log('successfully uploaded documents')
              document.location.href = `/Admin/UpdateAsset/${result.assetId}`;
            }
          });
        } else {
          alert(`failed to create asset, try again in the past.`);
        }
      }
    });
    }

    componentWillMount() {
        this.props.getsummary();
    }

    render() {
        console.log(this.props.summarydata);
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Add Asset <a>- Summary</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap">
                    <div className="summarytitle">{this.props.summarydata.assetname}</div>
                    <div className="summarymain">
                        <div className="summarymain_top">
                            <div className="summarymain_pic">
                                ?
                    <div>{this.props.summarydata.city}, {this.props.summarydata.county}</div>
                            </div>
                            <div className="summarymain_top_right">
                                <div className="summarymain_top_right_left">
                                    <h2>Property Address</h2>
                                    <h3>{this.props.summarydata.address}</h3>
                                    <h3>{this.props.summarydata.city}, {this.props.summarydata.State}</h3>
                                    <div>
                                        <h2>{this.props.summarydata.county}</h2>
                                    </div>
                                </div>
                                <div className="summarymain_top_right_right">
                                    <div>
                                        <h2>Original Aquisition Date</h2>
                                        <h3>{this.props.summarydata.aquisition}</h3>
                                    </div>
                                    <div>
                                        <h2>Original Purchase Price</h2>
                                        <h1>${(this.props.summarydata.purchaseprice) && this.props.summarydata.purchaseprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                    </div>
                                    <div>
                                        {this.props.summarydata.note && <h4><strong>Note -</strong> Secured by Mixed Use Commercial Property</h4>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dualwrap2">
                            <div className="summaryochc">
                                <strong>Operating Company:</strong> {this.props.summarydata.operating}
                            </div>
                            <div className="summaryochc">
                                <strong>Holding Company:</strong> {this.props.summarydata.holding}
                            </div>
                        </div>
                    </div>
                    <div className="documentswrap">
                        <div className="documentitem di_uploaded di_small">
                            <div>Title Insurance Policy</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_uploaded di_small">
                            <div>Vesting Deed</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_nouploaded di_small">
                            <div>Other Documents</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_uploaded di_big">
                            <div>State Documentation</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_nouploaded di_big">
                            <div>Offering Memorandum</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                    </div>
                    <div className="modalfooter">
                        <div className="footerextra footerapn">
                            <strong>APN #: </strong> {this.props.summarydata.apns && this.props.summarydata.apns.map(item => {
                                return item.value
                            }).join(", ")}
                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Create Asset</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Addasset extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            assetname: "",
            address: "",
            city: "",
            State: "",
            county: "",
            type: null,
            apns: [{ value: "" }],
            note: false,
            claimasset: false,
            apnresults: ['123', '234'],
            timeoutId: null
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.addApn = this.addApn.bind(this);
        this.delApn = this.delApn.bind(this);
        this.updateApn = this.updateApn.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.search = this.search.bind(this);
        this.testsearch = this.testsearch.bind(this);
    }

    handleClose() {
        //close modal here, not sure what we are doing here yet
        //debugger
        this.props.close()
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(`<handleInput> ${e.target.name}`, e.target.value);
        if (this.state.timeoutId) {
            clearTimeout(this.state.timeoutId);
            this.state.timeoutId = null;
        }
        this.state.timeoutId = setTimeout(this.search, 1000);
    }

    testsearch() {
        let requestData = {};
        requestData.AssetName = this.state.assetname;
        api.searchAssets(requestData, (err, res) => {
            if (err) {
                console.err(err);
            }
            else {
                console.log(res);
                // if (res.Assets.length === 1) {
                //     this.setState({
                //         assetname: res.Assets[0].Name,
                //         city: res.Assets[0].City,
                //         State: res.Assets[0].State,
                //         county: res.Assets[0].County,
                //         city: res.Assets[0].City,
                //         address: res.Assets[0].Address1 + res.Assets[0],
                //     })
                // }
            }
        })
    }

    search() {
        /*
        4/25/19
        Talked to Aaron.
        Only trigger a search when the county, state and an apn or 10 is/are provided.
        If it matches, return the asset properties and update the popup with asset vals.
        If it doesnt match, I still dont know
      */
      let requestData = {};
      if (this.state.State && this.state.county) {
        requestData.State = this.state.State;
        requestData.County = this.state.county;
        let apns = [];
        for (let i = 0; i < 10; i++) {
            let el = document.getElementById(`${i}-apn`);
            if (el) {
                let apn = el.value;
                if (apn.length && apn.trim().length) {
                    apns.push({ Key: i, Value: apn.trim().toLowerCase() })
                }
            } else { break; }
        }
        if (apns.length > 0) {
          requestData.Apns = apns;
          // trigger search
          api.searchAssets(requestData, (err, res) => {
            if (err) throw err;
            else {
            if (res.Assets.length === 1) {
                this.setState({
                  assetname: res.Assets[0].Name,
                  city: res.Assets[0].City,
                  State: res.Assets[0].State,
                  county: res.Assets[0].County,
                  address: res.Assets[0].Address1,
                })
              }
            }
          });
        }
      }
    }
    searchOld() {
        /*
          I'm not sure how this thing is supposed to behave at this level, soooooo
          - allow asset name to be disjoined from address like fields: If a User
            supplies an asset name, search, but if a user only provides a city, dont
            search until the address or asset name is provided.
          - with the above in place, if the request data has any fields, initiate a search.
        */
        let requestData = {};
        let assetName = document.getElementById('caAssetName').value;
        if (assetName.length && assetName.trim().length) { requestData.AssetName = assetName.trim().toLowerCase(); }
        let address = document.getElementById('caAddress').value;
        if (address.length && address.trim().length) { requestData.Address = address.trim().toLowerCase(); }
        if (requestData.Address || requestData.AssetName) {
            let city = document.getElementById('caCity').value;
            if (city.length) { requestData.City = city.trim().toLowerCase(); }
            const state = document.getElementById('caState').value;
            if (state.length) { requestData.State = state; }
            let county = document.getElementById('caCounty').value;
            if (county) { requestData.County = county.trim().toLowerCase(); }
      if (this.state.type) {
        let type = parseInt(this.state.type);
        if (!isNaN(type)) { requestData.AssetType = type; }
      }
        }
        if (Object.getOwnPropertyNames(requestData).length > 0) {
            // lets loop through 10 apns
            let apns = [];
            for (let i = 0; i < 10; i++) {
                let el = document.getElementById(`${i}-apn`);
                if (el) {
                    let apn = el.value;
                    if (apn.length && apn.trim().length) {
                        apns.push({ Key: i, Value: apn.trim().toLowerCase() })
                    }
                    //if (apn) { apns.push([i,parseInt(apn)]) }
                } else { break; }
            }
            if (apns.length > 0) requestData.Apns = apns;

            console.log('<search> before post', requestData);
            api.searchAssets(requestData, (err, res) => {
                if (err) {
                    console.err(err);
                } else {
                    /*
                      * We need to know which apns are duplicate
                      if asset, show claim button, hide create
                      if assets, ??
                      if no assets, show create button?
                        what if they didnt provide apns?
                          hide proceed buttons? for now, sure
                    */
                    if (res.Assets && res.Assets.length) {
                        // for now, show claim button if one asset, ignore > than
                        api.tempGlobal.assets = res.Assets;
                        this.state.claimasset = true;
                        if (res.Assets.length === 1) {

                        } else {
                            // let them select one of them??
                        }
                        console.log('claim this single asset')
                    } else {
                        // show create button
                        res.Assets = [];
                        if (apns.length > 0) {
                            // if the user provided apns and didnt match, allow user to create asset
                            // if all required fields are populated of course
                            this.state.claimasset = false;
                            console.log('asset is unique, create!')
                        }
                    }
                }
            });
        } else {
            console.log('<search> nothing to post');
        }
    }

    handleChecked(e) {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    addApn() {
        let apnobj = { value: "" };
        let stateapns = this.state.apns;
        stateapns.push(apnobj);
        this.setState({ apns: stateapns });
    }

    delApn(index) {
        let stateapns = this.state.apns;
        delete stateapns[index];
        this.setState({ apns: stateapns });
    }

    updateApn(e) {
        let index = e.target.name;
        let stateapns = this.state.apns;
        stateapns[index].value = e.target.value;
        console.log('state apns', stateapns);
        this.setState({ apns: stateapns });
    }

    submit(type) {
        var submittype = 0;
        if (type === "add") {
            submittype = 1;
            api.tempGlobal.newAsset = { // delete this, its already obsolete(I think)
                assetName: this.state.assetname,
                address: this.state.address,
                city: this.state.city,
                state: this.state.State,
                type: this.state.type,
                apn: this.state.apns,
                isNote: this.state.note,
            };
            api.tempGlobal.claimedAsset = null;
        if (this.state.type) { // feels wrong and hackish
          this.props.addinfo({addasset: this.state}, submittype);
        }
    }
        else {
            submittype = 2;
            api.tempGlobal.newAsset = null;
            if (api.tempGlobal.assets && api.tempGlobal.assets.length) {
                api.tempGlobal.claimedAsset = api.tempGlobal.assets[0]; // delete this once below is proven
                this.props.addinfo({ asset: api.tempGlobal.assets[0] }, submittype);
                if (api.tempGlobal.assets.length > 1) console.log('****IDK HOW MULTI ASSET CLAIM IS SUPPOSED TO WORK*****')
            } else {
                alert('nothing to claim')
            }
        }

    }

    componentDidMount() {
        let dataobj = Object.assign({}, this.props.data.addasset);
        this.setState(dataobj);
        // fetch user companies here? sure why not, use them for both claim and add paths
        api.getUserCompanies(function (err, result) {
            if (err) console.err(err);
            else {
                api.tempGlobal.holding = result.holdingCompanies;
                api.tempGlobal.operating = result.operatingCompanies;
            }
        });
    }

    render() {
        //debugger
        const stateAbbreviations = [
            '', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
            'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
            'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
            'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
            'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];

        let assetTypes = [
            { key: null, val: null }, { key: 1, val: 'Retail Tenant Property' }, { key: 2, val: 'Office Tenant Property' }, { key: 3, val: 'Multi-Family' }, { key: 4, val: 'Industrial Tenant Property' }, { key: 5, val: 'MHP' },
            { key: 6, val: 'Fuel Service Retail Property' }, { key: 7, val: 'Medical Tenant Property' }, { key: 8, val: 'Mixed Use Commercial Property' }, { key: 13, val: 'Fractured Condominium Portfolios' },
            { key: 14, val: 'Mini-Storage Property' }, { key: 15, val: 'Parking Garage Property' }, { key: 16, val: 'Secured Private Notes' }
        ];
        return (
            <div className="modalwrap modal_addasset animated slideInRight faster">
                <div className="topbar topbar_blue">
                    Add Asset
                <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap">

                    <div className="inputwrap">
                        <div className="inputtitle">Asset Name</div>
                        <input type="text" placeholder="Asset Name" value={this.state.assetname} onChange={this.handleInput} name="assetname" id="caAssetName" onBlur={this.testsearch}/>
                    </div>

                    <div className="inputwrap">
                        <div className="inputtitle">Address</div>
                        <input type="text" placeholder="Address" value={this.state.address} onChange={this.handleInput} name="address" id="caAddress" />
                    </div>

                    <div className="inputwrap flexdir_row">
                        <div className="inputmid">
                            <div className="inputtitle">City</div>
                            <input type="text" placeholder="City" value={this.state.city} onChange={this.handleInput} name="city" id="caCity" />
                        </div>
                        <div className="inputsmall">
                            <div className="inputtitle">State</div>
                            <select className="inputstyle select40" onChange={this.handleInput} name="State" id="caState">
                                {
                                    stateAbbreviations.map(item => {
                                        if (this.state.State === item) {
                                            return <option value={item} key={item} selected>{item}</option>;
                                        }
                                        else {
                                            return <option value={item} key={item}>{item}</option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="inputmid">
                            <div className="inputtitle">County</div>
                            <input type="text" placeholder="County" value={this.state.county} onChange={this.handleInput} name="county" id="caCounty" />
                        </div>
                    </div>

                    <div className="apnwrap">
                        <div className="apntop">
                            <h3>Assessor’s Parcel # (APNs)</h3>
                            <div className="bluebtn" onClick={this.addApn}>+</div>
                        </div>
                        {
                            this.state.apns.map((item, index) => {
                                let id = `${index}-apn`;
                                return <div className="apnitemwrap" key={index}>
                                    <input /*This is red style to indicate error for input --- className="inputred"*/ type="number" placeholder="Apn #" value={this.state.apns[index].value} onChange={this.updateApn} name={index} id={id} />
                                    <div className="delbtn" onClick={() => this.delApn(index)}>×</div>
                                </div>
                            })
                        }
                        {/* Here's the error message, need logic ---- <p>Error: This APN is currently registered to another property in our system. If you believe this to be an error, please contact us at admin@uscreonline.com</p> */ <p></p>}
                    </div>
                    <div className="inputwrap">
                        <div className="inputtitle">Asset Type</div>

                        <select className="inputstyle maxwidth select40" name="type" onChange={this.handleInput}>
                            {
                                assetTypes.map(item => {
                                    if (!item.val) {
                                        return <option value="" key="0" selected></option>;
                                    }
                                    else {
                                        if (this.state.type === item.val) {
                                            return <option value={item.key} key={item.key} selected>{item.val}</option>;
                                        }
                                        else {
                                            return <option value={item.key} key={item.key}>{item.val}</option>
                                        }
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="modalfooter">
                        <div className="footerextra">
                            <input type="checkbox" name="note" onChange={this.handleChecked} checked={this.state.note} />
                            <div>Note Asset</div>
                        </div>
                        <div className="buttonwrap">
                            {!this.state.claimasset && <div className="submitbtn hvr-float-shadow" onClick={() => this.submit("add")}>Add Asset</div>}
                            {this.state.claimasset && <div className="submitbtn submitorange hvr-float-shadow" onClick={() => this.submit("claim")}>Claim Asset</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Claim1 extends React.Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
        this.props.gonext(this.state, "claim1");
    }

    render() {
        let image;
        if (api.tempGlobal.claimedAsset.Image) image = `http://images.uscreonline.com/${api.tempGlobal.claimedAsset.AssetId}/${api.tempGlobal.claimedAsset.Image.FileName}`;
        return (
            <div className="modalwrap modal_med animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Asset Found
              <div className="closebutton" /*onClick={this.handleClose}*/ onClick={this.back}>×</div>
                </div>
                <div className="modal_contentwrap">
                    <div className="summarytitle">{api.tempGlobal.claimedAsset.Name}</div>
                    <div className="summarymain summarymain_thin">
                        <div className="summarymain_top summarymain_top_small">
                            <div className="summarymain_pic summarymain_pic_small">
                                {image && <img src={image} width="248px" height="168px"></img>}
                                {!image && <span>?</span>}
                                <div>{api.tempGlobal.claimedAsset.City}, {api.tempGlobal.claimedAsset.State}</div>
                            </div>
                            <div className="summarymain_top_right summarymain_top_right_small">
                                <div className="summarymain_top_right_right summarymain_top_right_right_small">
                                    <div className="flexheight100">
                                        <h2>{api.tempGlobal.claimedAsset.Address}</h2>
                                        <h3>{api.tempGlobal.claimedAsset.City}, {api.tempGlobal.claimedAsset.State}</h3>
                                        <h3>{api.tempGlobal.claimedAsset.County} County</h3>
                                        {api.tempGlobal.claimedAsset.IsMultiFamily && <h2>{api.tempGlobal.claimedAsset.Units} Units</h2>}
                                        {!api.tempGlobal.claimedAsset.IsMultiFamily && <h2>{api.tempGlobal.claimedAsset.LotSize} Lot</h2>}
                                        <h2>{api.tempGlobal.claimedAsset.SqFt} Sq. Ft.</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modalfooter">
                        <div className="footerextra">
                            <div>
                                <h3><strong>Note - </strong>Secured by Mixed Use Commercial property</h3>
                                <h3>Included in <strong>ABC123 Portfolio</strong></h3>
                                <h3><strong>27</strong> Assets in Portfolio</h3>
                            </div>
                        </div>
                        <div className="buttonwrap pad20">
                            <div className="submitbtn submitorange" onClick={this.nextStep}>Claim Asset</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Claim2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: 0,
            type: "",
            aquisition: "",
            purchaseprice: "",
            terms: "",
            operating: [],
            holding: [],
            currentoperating: "Operating Company",
            currentholding: "Holding Company"
        }

        this.back = this.back.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showDrop = this.showDrop.bind(this);
        this.hideDrop = this.hideDrop.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.saveCompanyData = this.saveCompanyData.bind(this);
        this.updateCurrentOperatingData = this.updateCurrentOperatingData.bind(this);
        this.updateCurrentHoldingData = this.updateCurrentHoldingData.bind(this);
    }

    nextStep() {
        this.props.gonext(this.state, "claim2");
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClose() {
        //close modal here, not sure what we are doing here yet
        console.log("close logic here");
    }

    back() {
        this.props.goback();
    }

    showDrop(type) {
        if (this.state.show) {
            this.setState({ show: 0, type: "" });
        }
        else {
            this.setState({ show: 1, type: type });
        }
    }

    hideDrop(e) {
        this.setState({ show: 0, type: "" });
    }

    componentDidMount() {
        let dataobj = Object.assign({}, this.props.data);
        this.setState(dataobj);
    }

    saveCompanyData(type, data) {
        // This is probably a totally trash way to get the name, maybe fix in future
        let currentname = data[0][Object.keys(data[0])];
        let current = "current" + this.state.type;
        console.log(data);

        if (!currentname) {
            /*if(this.state.type === "operating") {
                this.setState({ currentoperating: "Operating Company" });
            }
            if (this.state.type === "holding") {
                this.setState({ currentholding: "Holding Company" });
            }*/
            console.log('Company name required.');
        }
        else {
            // validate? In asset edit, the only requirement is company name
            const companyType = this.state.type === 'holding' ? 0 : 1;
            api.doesUserCompanyExist({
                CompanyName: currentname,
                Type: companyType,
            }, function (err, result) {
                if (err) console.err(err);
                else {
                    if (result.alreadyExists === true) {
                        let r = confirm('Company currently exists. Are you sure you would like to update this companys information?');

                        if (r === true) {
                            alert("make post call to update etc..");
                        }

                        else {
                            alert('Your changes were not saved.');
                        }
                    } else {
                        const payload = {
                            CompanyName: currentname,
                            Email: data[1][Object.keys(data[1])],
                            FirstName: data[2][Object.keys(data[2])],
                            LastName: data[3][Object.keys(data[3])],
                            Address1: data[4][Object.keys(data[4])],
                            Address2: data[5][Object.keys(data[5])],
                            City: data[6][Object.keys(data[6])],
                            State: data[7][Object.keys(data[7])],
                            Zip: data[8][Object.keys(data[8])],
                            Country: data[9][Object.keys(data[9])],
                            WorkNumber: data[10][Object.keys(data[10])],
                            CellNumber: data[11][Object.keys(data[11])],
                            FaxNumber: data[12][Object.keys(data[12])],
                            Type: companyType
                        };
                        api.createUserCompany(payload, function (err1, res) {
                            if (err1) console.err(err1);
                            else {
                                console.log('<saveCompanyData> company saved, refresh ddl and select this option?')
                                alert('created company')
                            }
                        })
                    }
                }
            });

            this.setState({ [type]: data, [current]: currentname });
        }
    }

    updateCurrentOperatingData(data, name) {
        this.setState({operating: data,currentoperating: name});
    }

    updateCurrentHoldingData(data, name) {
        this.setState({holding: data,currentholding: name});
    }

    render() {
        let termType = [
            'All Cash - no PMF', 'Cash & PMF', 'Cash & Assumption of existing Debt Package', 'Cash & Seller Carryback with Assumption of Existing Debt Package',
            'Cash & Seller Carryback (Property was F&C of any Debt Package)', 'Cash & Property for Property 1031 Exchange', 'Property for Property 1031 Exchange - No Cash Transfer',
            'Other'
        ];
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Claim Asset <a>- Step 1</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1>Please select your Operating Company and Holding Company</h1>
                    <div className="pad40"></div>
                    <div className="dualwrap">
                        <div className="width48">
                            <div className="orangeselect" onClick={() => this.showDrop("operating")}>
                                <div>{(this.state.currentoperating.length < 25) ? this.state.currentoperating : (this.state.currentoperating.substr(0, 22) + "...")}</div><div><img src="https://s3-us-west-1.amazonaws.com/dev-uscreonline-content/toggleicons/downarrow.png" /></div>
                            </div>
                            {(this.state.type === "operating") && <Ohdrop type="operating" savedata={this.saveCompanyData} closed={this.hideDrop} updateCurrentOperatingData={this.updateCurrentOperatingData} currentdata={this.state.operating} currentoperatingname={this.state.currentoperating}/>}
                        </div>
                        <div className="width48">
                            <div className="orangeselect" onClick={() => this.showDrop("holding")}>
                                <div>{(this.state.currentholding.length < 25) ? this.state.currentholding : (this.state.currentholding.substr(0, 22) + "...")}</div><div><img src="https://s3-us-west-1.amazonaws.com/dev-uscreonline-content/toggleicons/downarrow.png" /></div>
                            </div>
                            {(this.state.type === "holding") && <Ohdrop type="holding" savedata={this.saveCompanyData} closed={this.hideDrop} updateCurrentHoldingData={this.updateCurrentHoldingData} currentdata={this.state.holding} currentholdingname={this.state.currentholding}/>}
                        </div>
                    </div>

                    <div className="dualwrap">
                        <div className="width48">
                            <div className="orangetitle">Original Aquisition Date</div>
                            <input className="orangeselect" type="number" value={this.state.aquisition} onChange={this.handleInput} name="aquisition" />
                        </div>
                        <div className="width48">
                            <div className="orangetitle">Original Purchase Price</div>
                            <input className="orangeselect" type="number" value={this.state.purchaseprice} onChange={this.handleInput} name="purchaseprice" />
                        </div>
                    </div>

                    <div className="width100">
                        <div className="orangetitle">Terms</div>
                        <select className="orangeselect width100" onChange={this.handleInput} name="terms">
                            {
                                api.tempGlobal.sellerTerms.map(item => {
                                    if (item.val === this.state.terms) {
                                        return <option key={item.id} name={item.val} selected>{item.val}</option>
                                    }
                                    else {
                                        return <option key={item.id} name={item.val}>{item.val}</option>
                                    }
                                })
                            }
                        </select>
                    </div>

                    <div className="modalfooter">
                        <div></div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Claim3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documents: [{ 'Title Insurance Policy': 'File Upload' }, { 'Vesting Deed': 'File Upload' }, { 'State Documentation': 'File Upload' }, { 'Other': 'File Upload' }]
        }

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
        if (api.tempGlobal.docTitleInsurancePolicy &&
            api.tempGlobal.docVestingDeed &&
            api.tempGlobal.docStateDocumentation &&
            api.tempGlobal.docOther) {
            this.props.gonext(this.state, "claim3");
        } else {
            alert('You didnt upload all the required documents! SHAME!!!!');
        }

    }
    handleFileUpload(files, index, key) {
        //console.log(files[0].name);

        let copyState = Object.assign({}, this.state);
        copyState.documents[index][key] = files[0].name;
        this.setState(copyState);

        api.uploadFile(files, event.target.getAttribute('data-type'));
    }
    handleDragOver() {
        event.stopPropagation();
        event.preventDefault();
    }

    handleDrop(event, index, key) {
        event.stopPropagation();
        event.preventDefault();

        let copyState = Object.assign({}, this.state);
        copyState.documents[index][key] = event.dataTransfer.files[0].name;
        this.setState(copyState);

        api.uploadFile(event.dataTransfer.files, event.target.getAttribute('data-type'));
    }

    render() {
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Claim Asset <a>- Step 2</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap bigpad">
                    <h1 className="h1bigfont">Please upload your proof of title documents here</h1>
                    <h2 className="h1bigfont">Maximum upload size 25MB</h2>
                    <div className="pad40"></div>
                    <div className="flexwrap_spacebetween">
                        {
                            this.state.documents.map((item, index) => {
                                let key = Object.keys(item)[0];
                                return <div key={key}>
                                    <h3>{key}</h3>
                                    <div
                                        className="uploadwrap"
                                        draggable="true"
                                        data-type={key}
                                        onDragOver={this.handleDragOver}
                                        onDrop={() => this.handleDrop(index, key)}>
                                        <div>Drag & Drop Files Here</div>
                                            <input className="addclaim_fileinput" type="file" name={key} data-type={key} onChange={(e) => this.handleFileUpload(e.target.files, index, key)} />
                                            <div className="addclaim_filebutton">{this.state.documents[index][key]}</div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="modalfooter">
                        <div>

                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Next</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class Claim4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.back = this.back.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    back() {
        this.props.goback();
    }

    nextStep() {
    //this.props.gonext(this.state, "add3");
    api.claimAsset({
      AssetId: api.tempGlobal.claimedAsset.AssetId
    }, (err, result) => {
      if (err) throw err;
      else {
        alert('created asset version, saving docs');
        let docPayload = new FormData();
        docPayload.append('assetId', api.tempGlobal.claimedAsset.AssetId);
        docPayload.append('stateDocumentation', api.tempGlobal.docStateDocumentation);
        docPayload.append('vestingDeed', api.tempGlobal.docVestingDeed);
        docPayload.append('titleInsurancePolicy', api.tempGlobal.docTitleInsurancePolicy);
        docPayload.append('other', api.tempGlobal.docOther);
        api.uploadFilesForClaimAsset(docPayload, (docErr, docResult) => {
          if (docErr) throw err;
          else {
            alert('successfully did the things')
            document.location.href = `/Admin/UpdateAssetVersion/${api.tempGlobal.claimedAsset.AssetId}`;
          }
        });
      }
    });
    }

    componentWillMount() {
        //this.props.getsummary();
    }

    render() {
        let image;
        if (api.tempGlobal.claimedAsset.Image) image = `http://images.uscreonline.com/${api.tempGlobal.claimedAsset.AssetId}/${api.tempGlobal.claimedAsset.Image.FileName}`;
        return (
            <div className="modalwrap modal_big animated slideInRight faster">
                <div className="topbar topbar_orange">
                    Claim Asset <a>- Summary</a>
                    <div className="closebutton" onClick={this.handleClose}>×</div>
                </div>
                <div className="modal_contentwrap">
                    <div className="summarytitle">{api.tempGlobal.claimedAsset.Name}</div>
                    <div className="summarymain">
                        <div className="summarymain_top">
                            <div className="summarymain_pic">
                                {image && <img src={image} width="248px" height="168px"></img>}
                                {!image && <span>?</span>}
                                <div>{api.tempGlobal.claimedAsset.City}, {api.tempGlobal.claimedAsset.County}</div>
                            </div>
                            <div className="summarymain_top_right">
                                <div className="summarymain_top_right_left">
                                    <h2>Property Address</h2>
                                    <h3>{api.tempGlobal.claimedAsset.Address}</h3>
                                    <h3>{api.tempGlobal.claimedAsset.City}, {api.tempGlobal.claimedAsset.State}</h3>
                                    <h2>{api.tempGlobal.claimedAsset.County}</h2>
                                    <div>
                                        {this.props.summarydata.note && <h4><strong>Note -</strong> Secured by Mixed Use Commercial Property</h4>}
                                    </div>
                                </div>
                                <div className="summarymain_top_right_right">
                                    <div>
                                        <h5>List Price</h5>
                                        <h1>${(api.tempGlobal.claimedAsset.ListPrice) && api.tempGlobal.claimedAsset.ListPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                        <h1 className="h1extrasmall">Last Priced: 02/05/2019</h1>
                                        <h6>110 Units</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dualwrap2">
                            <div className="summaryochc">
                                <strong>Operating Company:</strong> {this.props.summarydata.operating}
                            </div>
                            <div className="summaryochc">
                                <strong>Holding Company:</strong> {this.props.summarydata.holding}
                            </div>
                        </div>
                    </div>
                    <div className="summarymiddlewrap">
                        <div><strong>Included in</strong> ABC123 Portfolio</div>
                        <div><strong>27</strong> Assets in Portfolio</div>
                    </div>
                    <div className="documentswrap">
                        <div className="documentitem di_uploaded di_small">
                            <div>Title Insurance Policy</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_uploaded di_small">
                            <div>Vesting Deed</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_nouploaded di_small">
                            <div>Other Documents</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_uploaded di_big">
                            <div>State Documentation</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                        <div className="documentitem di_nouploaded di_big">
                            <div>Offering Memorandum</div>
                            <img alt="" src='https://i.imgur.com/zi2xAOz.png' />
                        </div>
                    </div>
                    <div className="modalfooter">
                        <div className="footerextra footerapn">
                            <strong>APN #: </strong> {api.tempGlobal.claimedAsset.Apns && api.tempGlobal.claimedAsset.Apns.map(item => {
                                return item.value
                            }).join(", ")}
                        </div>
                        <div className="buttonwrap">
                            <div className="submitbtn submitorange top20 hvr-float-shadow" onClick={this.back}>Back</div>
                            <div className="submitbtn top20 hvr-float-shadow" onClick={this.nextStep}>Claim Asset</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class HeresYourButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPop: false
        }

        this.showClaimPop = this.showClaimPop.bind(this);
        this.handleClose = this.showClaimPop.bind(this);
    }

    showClaimPop() {
        this.setState({ showPop: !this.state.showPop });
    }

    handleClose() {
        
        this.setState({ showPop: false });
    }

    render() {
        
        return (
            
            <React.Fragment>
                <button id="createAssetButton" className="btn btn-primary" onClick={this.showClaimPop} >
                    Create New Asset
                </button>

                {this.state.showPop && <ClaimAsset closepop={this.handleClose} />}
            </React.Fragment>
        );
    }
}
ReactDOM.render(<HeresYourButton />, document.getElementById('dummyID'));


