import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import PrimaryButton from '../../../components/PrimaryButton';
import Color from '../../../theme/color';
import Font from '../../../theme/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthNum = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];
const monthDate = [
  {
    date: '01',
    selected: false,
  },
  {
    date: '02',
    selected: false,
  },
  {
    date: '03',
    selected: false,
  },
  {
    date: '04',

    selected: false,
  },
  {
    date: '05',
    selected: false,
  },
  {
    date: '06',
    selected: false,
  },
  {
    date: '07',
    selected: false,
  },
  {
    date: '08',
    selected: false,
  },
  {
    date: '09',
    selected: false,
  },
  {
    date: '10',
    selected: false,
  },
  {
    date: '11',

    selected: false,
  },
  {
    date: '12',
    selected: false,
  },
  {
    date: '13',
    selected: false,
  },
  {
    date: '14',
    selected: false,
  },
  {
    date: '15',
    selected: false,
  },
  {
    date: '16',
    selected: false,
  },
  {
    date: '17',
    selected: false,
  },
  {
    date: '18',

    selected: false,
  },
  {
    date: '19',
    selected: false,
  },
  {
    date: '20',
    selected: false,
  },
  {
    date: '21',
    selected: false,
  },
  {
    date: '22',
    selected: false,
  },
  {
    date: '23',
    selected: false,
  },
  {
    date: '24',
    selected: false,
  },
  {
    date: '25',

    selected: false,
  },
  {
    date: '26',
    selected: false,
  },
  {
    date: '27',
    selected: false,
  },
  {
    date: '28',
    selected: false,
  },
  {
    date: '29',
    selected: false,
  },
  {
    date: '30',
    selected: false,
  },
];

const days = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THUR',
  'FRI',
  'SAT',
]
const WorkFromHome = ({visible, setVisible}) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthDates, setMonthDates] = useState(monthDate);
  const [leaveDate, setLeaveDate] = useState();
  const [submitted, setSubmitted] = useState(false);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setVisible(!visible);
        setSubmitted(false);
        setMonthDates(monthDate);
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(!visible);
          setSubmitted(false);
          setMonthDates(monthDate);
          console.log(monthDate);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInputContainer}>
            <Text style={styles.heading}>
              Work at home request{'\n'}Select date and day
            </Text>

            {submitted ? (
              <Text style={styles.requestSubmittedText}>
                Your request successfully Submit
              </Text>
            ) : (
              <View style={styles.scrollContainer}>
                <View style={styles.row}>
                  <Text style={styles.heading}>
                    {months[currentMonth]} {currentYear}
                  </Text>
                  <TouchableOpacity onPress={previousMonth} style={styles.btn}>
                    <Entypo name="chevron-small-up" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={nextMonth} style={styles.btn}>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {monthDates.map((date, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setMonthDates(
                            [...monthDates].filter((d) => {
                              if (d.date === date.date) {
                                d.selected = !d.selected;
                              }
                              return d;
                            }),
                          );
                        }}
                        key={index}
                        style={
                          date.selected
                            ? styles.dateContainerActive
                            : styles.dateContainer
                        }>
                        <Text
                          style={
                            date.selected ? styles.dateActive : styles.date
                          }>
                          {date.date}
                        </Text>
                        <Text
                          style={date.selected ? styles.dayActive : styles.day}>
                          {days[new Date(
                              `${currentYear}-${monthNum[currentMonth]}-${date.date}`,
                            ).getDay()]}
                        </Text>
                        <View style={styles.triangle} />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            <PrimaryButton
              placeholder="SUBMIT"
              bold
              placeholderStyle={{fontSize: wp(4.8)}}
              width={37}
              height={11}
              style={{backgroundColor: Color.red}}
              onClick={() => setSubmitted(true)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WorkFromHome;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInputContainer: {
    height: wp(80),
    width: wp(85),
    backgroundColor: '#fff',
    borderRadius: wp(7),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: wp(4),
    fontFamily: Font.SFProText,
  },
  scrollContainer: {
    height: wp(35),
    width: wp(75),
    borderTopWidth: wp(0.5),
    borderBottomWidth: wp(0.5),
    borderColor: '#f5f5f5',
    paddingVertical: wp(4),
    marginVertical: wp(4),
  },
  dateContainer: {
    marginTop: wp(3),
    height: wp(16),
    width: wp(11),
    backgroundColor: '#fff',
    margin: wp(1),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: wp(5),
  },
  date: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProTextSemibold,
    color: '#000',
  },
  day: {
    fontSize: wp(2.5),
    fontFamily: Font.SFProTextSemibold,
    color: '#000',
  },
  dateContainerActive: {
    marginTop: wp(3),
    height: wp(16),
    width: wp(11),
    backgroundColor: Color.red,
    margin: wp(1),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: wp(5),
  },
  dateActive: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProTextSemibold,
    color: '#fff',
  },
  dayActive: {
    fontSize: wp(2.5),
    fontFamily: Font.SFProTextSemibold,
    color: '#fff',
  },
  triangle: {
    height: wp(3),
    width: wp(3),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: wp(4),
    borderTopLeftRadius: wp(4),
  },
  btn: {
    backgroundColor: '#f5f5f5',
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  requestSubmittedText: {
    fontSize: wp(4),
    color: Color.yellow,
    fontFamily: Font.SFProTextSemibold,
    borderTopWidth: wp(0.5),
    borderBottomWidth: wp(0.5),
    borderColor: '#f5f5f5',
    paddingVertical: wp(4),
    marginVertical: wp(4),
    height: wp(35),
    width: wp(75),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
