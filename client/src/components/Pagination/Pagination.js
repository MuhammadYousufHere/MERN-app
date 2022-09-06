import React, { Component } from "react";
import PropTypes from "prop-types";

import "./index.css";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_campaigns: "",
            pageLimit: "",
            total_pages: "",
            current_page: "",
            initialPage: "",
            pagesToShow: ""
        };
    }

    componentDidMount() {
        this.setState({
            total_campaigns: this.props.total_campaigns,
            pageLimit: this.props.pageLimit || 10,
            total_pages: Math.ceil(this.props.total_campaigns / this.props.pageLimit),
            pagesToShow: this.props.pagesToShow || 5,
            current_page: this.props.initialPage || 1
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            total_campaigns: nextProps.total_campaigns,
            pageLimit: nextProps.pageLimit || 10,
            total_pages: Math.ceil(nextProps.total_campaigns / nextProps.pageLimit),
            pagesToShow: nextProps.pagesToShow || 5
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.total_campaigns !== prevState.total_campaigns ||
            this.state.pageLimit !== prevState.pageLimit
        ) {
            this.setPage(this.state.current_page);
        }
    }

    setPage(page) {
        var { total_campaigns, pageLimit, total_pages } = this.state;

        if (page < 1) {
            page = 1;
        } else if (page > total_pages) {
            page = total_pages;
        }

        this.setState({
            currentPage: page
        });

        var startIndex = (page - 1) * pageLimit;
        var endIndex = Math.min(startIndex + pageLimit - 1, total_campaigns - 1);

        this.props.onChangePage({
            pageLimit,
            total_campaigns,
            page,
            startIndex,
            endIndex
        });
    }

    getPager() {
        var { pagesToShow, current_page, total_pages } = this.state;
        var pages = [],
            startFromNumber;

        if (total_pages <= pagesToShow) {
            startFromNumber = 1;
            pagesToShow = total_pages;
        } else {
            if (current_page <= Math.ceil(pagesToShow / 2)) {
                startFromNumber = 1;
            } else if (
                current_page + Math.floor((pagesToShow - 1) / 2) >=
                total_pages
            ) {
                startFromNumber = total_pages - (pagesToShow - 1);
            } else {
                startFromNumber = current_page - Math.floor(pagesToShow / 2);
            }
        }

        for (let i = 1; i <= pagesToShow; i++) {
            pages.push(startFromNumber++);
        }

        return {
            current_page,
            total_pages,
            pages
        };
    }

    render() {
        if (!this.state.total_campaigns || this.state.total_pages === 1) return null;

        var pager = this.getPager();

        return (
            <ul className="pagination">
                {pager.pages.map((page, index) => (
                    <li key={index}>
                        <button
                            className={pager.current_page === page ? "active" : ""}
                            onClick={() => this.setPage(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
}

Pagination.propTypes = {
    total_campaigns: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    initialPage: PropTypes.number,
    pagesToShow: PropTypes.number,
    onChangePage: PropTypes.func
};

export default Pagination;