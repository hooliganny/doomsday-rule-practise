function Modal({
  isOpen,
  onClose,
  days,
}: {
  isOpen: boolean;
  onClose: () => void;
  days: string[];
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <h2>The Doomsday Rule</h2>
          <section>
            The Doomsday Rule is a way of calculating what day a given date is
            in the standard Gregorian Calendar.
            <br />
            First we must find out the Doomsday of the year, then the day of the
            chosen date.
            <br /> <br />
            For an example, let's calculate what day the 25th of December, 1942
            was. <br /> <br />
            When working with days, we map each day of the week to a number up
            to 6 (modulo 7).
            <br />
            {days.map((day, index) => {
              return (
                <span>
                  {day} = {index} <br />
                </span>
              );
            })}
          </section>
          <section>
            First, we need to determine the "anchor" day of the century of the
            date in question. <br />
            Anchor days: <br />
            1800 - 1899: Friday <br />
            1900 - 1999: Wednesday <br />
            2000 - 2099: Tuesday <br />
            2100 - 2199: Sunday <br /> <br />
            Our year is 1942, which is a Wednesday (<b>or a 3</b>) - people will
            often ask for days in this century so it is important to remember,
            one way to remember is to think "we"-ndesday
          </section>
          <section>
            Following that, we can begin the calculations. <br />
            First we calculate how many 12s fit into the amount of years after
            the start of the century in question. <br />
            i.e.: 1942 has 42 years. <br />
            42/12 = 3.5 <br />
            Which means <b>3</b> 12s fit into 42.
          </section>
          <section>
            Next we calculate the remainder from the above step. <br />
            12*3=36
            <br />
            42-36=<b>6</b>
            <br />
          </section>
          <section>
            We then calculate how many 4s fit into the previous answer.
            <br />
            6/4=1.5 <br />
            Which means <b>1</b> 4s fit into 6. <br />
          </section>
          <section>
            Next we add up all the previous answers and take the answer modulo
            7. That is our day (use the chart above). <br />
            3 from the anchor day, 3 from the 12s, 6 from the remainder, and 1
            from the 4s.
            <br />
            <b>3</b>+<b>3</b>+<b>6</b>+<b>1</b>=13 <br />
            7%7=<b>6</b> <br />6 corresponds to a Saturday. This is the Doomsday
            for 1942.
          </section>
          <section>
            Now we must use the fact the certain days of the year always occur
            on the same day, the year's doomsday. <br />
            These days are:
            <ul>
              <li>January 3 (1/3)</li>
              <li>February 28 or 29 if leap year (2/28 or 2/29)</li>
              <li>April 4 (4/4)</li>
              <li>May 9 (5/9)</li>
              <li>June 6 (6/6)</li>
              <li>July 11 (11/7)</li>
              <li>August 8 (8/8)</li>
              <li>September 5 (9/5)</li>
              <li>October 10 (10/10)</li>
              <li>November 7 (7/11)</li>
              <li>December 12 (12/12)</li>
            </ul>
            You will notice there is a lot of similarity between all these
            dates, so they won't be too hard to memorise.
          </section>
          <section>
            Now we finally get to find the day of our date in question. <br />
            We can calculate the difference between our date and the date from
            the doomsdays above. <br />
            25-12=13 <br />
            13%7=6 <br />
            We need to go 6 days ahead of the doomsday for the year. <br />
            <br />
            (6+6)%7=<b>5</b> <br />
            <br />5 is a Friday. Therefore, our date, 25/12/1942 is a Friday.
          </section>
          <section>
            Credit:{" "}
            <a href="https://www.timeanddate.com/date/doomsday-weekday.html">
              https://www.timeanddate.com/date/doomsday-weekday.html
            </a>{" "}
            <br />
            and{" "}
            <a href="https://www.timeanddate.com/date/doomsday-rule.html">
              https://www.timeanddate.com/date/doomsday-rule.html
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Modal;
