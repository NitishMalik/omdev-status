import React from 'react';
import DatePicker from 'react-datepicker';
import { setDateRange } from '../../actions/platformActions';
import { connect } from 'react-redux';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class DateRangePicker extends React.Component {
    constructor (props) {
        super(props);

        this.handleChangeStart = this.handleChangeStart.bind(this);

    }

    componentWillMount() {
        this.highlightRemainingWeek();
    }

    highlightRemainingWeek(date) {
        let m;
        if(!date) {
            m = moment();
        } else {
            m = moment(date);
        }
        m.locale("en");
        let start = m.startOf('week');
        let end = start.clone().endOf('week');

        let placeholderText = start.format("YYYY/MMM/DD") + " - " + end.format("YYYY/MMM/DD");

        let clonedM = m.clone();

        let startDiff = clonedM.diff(start, 'days');
        let endDiff = end.diff(clonedM, 'days');

        let highlightArray = [];

        let i = startDiff;

        for(i; i >= 0; i--) {
            highlightArray.push(clonedM.clone().subtract(i, "days"));
        }

        i = endDiff;
        for(i; i > 0; i--) {
            highlightArray.push(clonedM.clone().add(i, "days"));
        }

        this.setState({
            startDate: start,
            endDate: end,
            highlightWithRanges: [{"react-datepicker__day--keyboard-selected": highlightArray}],
            placeholderText: placeholderText
        });

        this.props.setDateRange(start.toDate(), end.toDate());

    }

    handleChangeStart(date) {
        this.highlightRemainingWeek(date);
    }

    render() {
        return <div className="date-range-picker">
            <div className="date-container">
                Select Week: <DatePicker
                selected={this.state.startDate}
                value={this.state.placeholderText}
                onChange={this.handleChangeStart}
                highlightDates={this.state.highlightWithRanges}
                className="startdate custom-date-selector"
            />
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => ({
    startDate: state.startDate,
    endDate: state.endDate
});

export default connect(mapStateToProps, { setDateRange })(DateRangePicker);