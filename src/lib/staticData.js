/**
 * SWAIS — Static demo data for all features
 * Used for frontend-only demo (no backend required)
 */

// ── Students ────────────────────────────────────────────────────────────────

const makeStudent = (id, roll, name, gender, parent, phone, cls, sec) => ({
  student_id: id, roll_number: roll, name, gender, parent_name: parent,
  parent_phone: phone, class_name: cls, section: sec,
});

export const STATIC_STUDENTS = {
  "8A": [
    makeStudent(101,"8A01","Aarav Sharma","male","Rajesh Sharma","9876500101","8","A"),
    makeStudent(102,"8A02","Priya Nair","female","Suresh Nair","9876500102","8","A"),
    makeStudent(103,"8A03","Arjun Patel","male","Dinesh Patel","9876500103","8","A"),
    makeStudent(104,"8A04","Kavya Reddy","female","Ramesh Reddy","9876500104","8","A"),
    makeStudent(105,"8A05","Rohan Singh","male","Vikram Singh","9876500105","8","A"),
    makeStudent(106,"8A06","Ananya Iyer","female","Mohan Iyer","9876500106","8","A"),
    makeStudent(107,"8A07","Karthik Menon","male","Rajan Menon","9876500107","8","A"),
    makeStudent(108,"8A08","Sneha Gupta","female","Anil Gupta","9876500108","8","A"),
    makeStudent(109,"8A09","Vivek Kumar","male","Sunil Kumar","9876500109","8","A"),
    makeStudent(110,"8A10","Pooja Verma","female","Ajay Verma","9876500110","8","A"),
    makeStudent(111,"8A11","Aditya Joshi","male","Prakash Joshi","9876500111","8","A"),
    makeStudent(112,"8A12","Meera Pillai","female","Krishnan Pillai","9876500112","8","A"),
    makeStudent(113,"8A13","Rahul Desai","male","Vinod Desai","9876500113","8","A"),
    makeStudent(114,"8A14","Deepa Nambiar","female","Sanjay Nambiar","9876500114","8","A"),
    makeStudent(115,"8A15","Siddharth Rao","male","Madhu Rao","9876500115","8","A"),
    makeStudent(116,"8A16","Lakshmi Krishnan","female","Balu Krishnan","9876500116","8","A"),
    makeStudent(117,"8A17","Nikhil Bose","male","Tapan Bose","9876500117","8","A"),
    makeStudent(118,"8A18","Riya Malhotra","female","Kapil Malhotra","9876500118","8","A"),
    makeStudent(119,"8A19","Suresh Naidu","male","Gopal Naidu","9876500119","8","A"),
    makeStudent(120,"8A20","Divya Mishra","female","Arun Mishra","9876500120","8","A"),
    makeStudent(121,"8A21","Pranav Shah","male","Nilesh Shah","9876500121","8","A"),
    makeStudent(122,"8A22","Shreya Tiwari","female","Ramkumar Tiwari","9876500122","8","A"),
    makeStudent(123,"8A23","Harish Yadav","male","Bharat Yadav","9876500123","8","A"),
    makeStudent(124,"8A24","Nisha Choudhary","female","Satish Choudhary","9876500124","8","A"),
    makeStudent(125,"8A25","Mohit Sinha","male","Rajendra Sinha","9876500125","8","A"),
  ],
  "8B": [
    makeStudent(201,"8B01","Ishaan Kapoor","male","Deepak Kapoor","9876500201","8","B"),
    makeStudent(202,"8B02","Tanvi Shukla","female","Rajeev Shukla","9876500202","8","B"),
    makeStudent(203,"8B03","Varun Pillai","male","Hari Pillai","9876500203","8","B"),
    makeStudent(204,"8B04","Aisha Khan","female","Imran Khan","9876500204","8","B"),
    makeStudent(205,"8B05","Chirag Mehta","male","Bhavesh Mehta","9876500205","8","B"),
    makeStudent(206,"8B06","Riddhi Jain","female","Mahesh Jain","9876500206","8","B"),
    makeStudent(207,"8B07","Surya Narayanan","male","Venkat Narayanan","9876500207","8","B"),
    makeStudent(208,"8B08","Pallavi Ghosh","female","Subir Ghosh","9876500208","8","B"),
    makeStudent(209,"8B09","Akash Trivedi","male","Hemant Trivedi","9876500209","8","B"),
    makeStudent(210,"8B10","Simran Kaur","female","Gurpreet Singh","9876500210","8","B"),
    makeStudent(211,"8B11","Dev Chatterjee","male","Asim Chatterjee","9876500211","8","B"),
    makeStudent(212,"8B12","Keerthi Suresh","female","Suresh Kumar","9876500212","8","B"),
    makeStudent(213,"8B13","Manav Goel","male","Sandeep Goel","9876500213","8","B"),
    makeStudent(214,"8B14","Bhavna Pandey","female","Manoj Pandey","9876500214","8","B"),
    makeStudent(215,"8B15","Ashwin Murthy","male","Srinivas Murthy","9876500215","8","B"),
    makeStudent(216,"8B16","Preethi Balaji","female","Balaji Raman","9876500216","8","B"),
    makeStudent(217,"8B17","Gaurav Saxena","male","Pawan Saxena","9876500217","8","B"),
    makeStudent(218,"8B18","Swati Aggarwal","female","Rakesh Aggarwal","9876500218","8","B"),
    makeStudent(219,"8B19","Arun Krishnamurthy","male","Krishnamurthy V","9876500219","8","B"),
    makeStudent(220,"8B20","Neha Srivastava","female","Alok Srivastava","9876500220","8","B"),
    makeStudent(221,"8B21","Yash Bhatt","male","Tushar Bhatt","9876500221","8","B"),
    makeStudent(222,"8B22","Geetha Nair","female","Mohanan Nair","9876500222","8","B"),
    makeStudent(223,"8B23","Kunal Sharma","male","Virender Sharma","9876500223","8","B"),
    makeStudent(224,"8B24","Rani Menon","female","Sudhakaran Menon","9876500224","8","B"),
    makeStudent(225,"8B25","Tarun Reddy","male","Chandra Reddy","9876500225","8","B"),
  ],
  "9A": [
    makeStudent(301,"9A01","Advaith Nair","male","Sreenivasan Nair","9876500301","9","A"),
    makeStudent(302,"9A02","Bhavya Patel","female","Hitesh Patel","9876500302","9","A"),
    makeStudent(303,"9A03","Chetan Iyer","male","Ramachandran Iyer","9876500303","9","A"),
    makeStudent(304,"9A04","Diya Singh","female","Amarjit Singh","9876500304","9","A"),
    makeStudent(305,"9A05","Eshan Verma","male","Rakesh Verma","9876500305","9","A"),
    makeStudent(306,"9A06","Falguni Shah","female","Jignesh Shah","9876500306","9","A"),
    makeStudent(307,"9A07","Girish Kumar","male","Praveen Kumar","9876500307","9","A"),
    makeStudent(308,"9A08","Harini Rajan","female","Gopala Rajan","9876500308","9","A"),
    makeStudent(309,"9A09","Ishan Bose","male","Biswajit Bose","9876500309","9","A"),
    makeStudent(310,"9A10","Jyoti Malhotra","female","Sanjiv Malhotra","9876500310","9","A"),
    makeStudent(311,"9A11","Kiran Naidu","male","Subramanyam Naidu","9876500311","9","A"),
    makeStudent(312,"9A12","Lavanya Krishnan","female","Sudarshan Krishnan","9876500312","9","A"),
    makeStudent(313,"9A13","Mihir Joshi","male","Yogesh Joshi","9876500313","9","A"),
    makeStudent(314,"9A14","Nandini Rao","female","Venkatesan Rao","9876500314","9","A"),
    makeStudent(315,"9A15","Om Desai","male","Kiran Desai","9876500315","9","A"),
    makeStudent(316,"9A16","Pallavi Mishra","female","Shyam Mishra","9876500316","9","A"),
    makeStudent(317,"9A17","Qadir Ahmed","male","Salim Ahmed","9876500317","9","A"),
    makeStudent(318,"9A18","Ritu Gupta","female","Naveen Gupta","9876500318","9","A"),
    makeStudent(319,"9A19","Samarth Tiwari","male","Dinesh Tiwari","9876500319","9","A"),
    makeStudent(320,"9A20","Tanisha Kapoor","female","Rajiv Kapoor","9876500320","9","A"),
    makeStudent(321,"9A21","Uday Pillai","male","Harikrishnan Pillai","9876500321","9","A"),
    makeStudent(322,"9A22","Vidya Suresh","female","Anantha Suresh","9876500322","9","A"),
    makeStudent(323,"9A23","Waman Patil","male","Dattatray Patil","9876500323","9","A"),
    makeStudent(324,"9A24","Xena Fernandez","female","Joseph Fernandez","9876500324","9","A"),
    makeStudent(325,"9A25","Yuvraj Mehra","male","Ashok Mehra","9876500325","9","A"),
  ],
  "9B": [
    makeStudent(401,"9B01","Zara Hussain","female","Faisal Hussain","9876500401","9","B"),
    makeStudent(402,"9B02","Abhiram Nair","male","Chandran Nair","9876500402","9","B"),
    makeStudent(403,"9B03","Bindhu Varma","female","Rajan Varma","9876500403","9","B"),
    makeStudent(404,"9B04","Chinmay Kulkarni","male","Suhas Kulkarni","9876500404","9","B"),
    makeStudent(405,"9B05","Dharini Iyer","female","Parthasarathy Iyer","9876500405","9","B"),
    makeStudent(406,"9B06","Eshaan Mehta","male","Ashish Mehta","9876500406","9","B"),
    makeStudent(407,"9B07","Falak Shaikh","female","Rafiq Shaikh","9876500407","9","B"),
    makeStudent(408,"9B08","Gokul Menon","male","Madhavan Menon","9876500408","9","B"),
    makeStudent(409,"9B09","Hema Krishnaswamy","female","Krishnaswamy R","9876500409","9","B"),
    makeStudent(410,"9B10","Inder Bajaj","male","Suresh Bajaj","9876500410","9","B"),
    makeStudent(411,"9B11","Jhanvi Patel","female","Jayesh Patel","9876500411","9","B"),
    makeStudent(412,"9B12","Kartik Shetty","male","Ramesh Shetty","9876500412","9","B"),
    makeStudent(413,"9B13","Latha Subramaniam","female","Subramaniam K","9876500413","9","B"),
    makeStudent(414,"9B14","Manish Yadav","male","Dinesh Yadav","9876500414","9","B"),
    makeStudent(415,"9B15","Nalini Choudhury","female","Tapan Choudhury","9876500415","9","B"),
    makeStudent(416,"9B16","Omkar Sawant","male","Dattatray Sawant","9876500416","9","B"),
    makeStudent(417,"9B17","Parvati Nambiar","female","Krishnadas Nambiar","9876500417","9","B"),
    makeStudent(418,"9B18","Ritesh Ghosh","male","Pradip Ghosh","9876500418","9","B"),
    makeStudent(419,"9B19","Shalini Trivedi","female","Girish Trivedi","9876500419","9","B"),
    makeStudent(420,"9B20","Tarun Kaur","male","Balwinder Singh","9876500420","9","B"),
    makeStudent(421,"9B21","Uma Chatterjee","female","Debashis Chatterjee","9876500421","9","B"),
    makeStudent(422,"9B22","Vijay Narayanan","male","Narayanan S","9876500422","9","B"),
    makeStudent(423,"9B23","Wasim Mirza","male","Aslam Mirza","9876500423","9","B"),
    makeStudent(424,"9B24","Yamini Balasubramanian","female","Balasubramanian T","9876500424","9","B"),
    makeStudent(425,"9B25","Zubin D'Souza","male","Derek D'Souza","9876500425","9","B"),
  ],
};

// ── Chapters ─────────────────────────────────────────────────────────────────

export const CHAPTERS = [
  "Chapter 1 — How, When and Where",
  "Chapter 2 — From Trade to Territory",
  "Chapter 3 — Ruling the Countryside",
  "Chapter 4 — Tribals, Dikus and the Vision of a Golden Age",
  "Chapter 5 — When People Rebel",
  "Chapter 6 — Colonialism and the City",
  "Chapter 7 — Weavers, Iron Smelters and Factory Owners",
  "Chapter 8 — Civilising the 'Native', Educating the Nation",
];

// ── Notify Templates ─────────────────────────────────────────────────────────

export const NOTIFY_TEMPLATES = {
  let_drop: (student, score, usual) =>
    `Dear Parent/Guardian of ${student}, I would like to bring to your attention that ${student.split(" ")[0]} usually scores ${usual}% in Lesson Ending Tests. In the recent LET, they scored ${score}%. This is a slight dip from their usual performance. Kindly spend some time revising the chapter with them at home. Please feel free to reach out if you'd like to discuss further.\n\n— Acharya Sandipani, SWAIS`,
  peer_help: (student, helped) =>
    `Dear Parent/Guardian of ${student}, It gives me great pleasure to inform you that ${student.split(" ")[0]} showed wonderful teamwork today by helping their classmate ${helped} understand a difficult concept. This kind of peer learning is a sign of strong character and academic confidence. Please appreciate them at home!\n\n— Acharya Sandipani, SWAIS`,
  good_manners: (student) =>
    `Dear Parent/Guardian of ${student}, I am happy to share that ${student.split(" ")[0]} demonstrated excellent manners and conduct in class today. They were respectful, attentive, and set a great example for their peers. You should be very proud!\n\n— Acharya Sandipani, SWAIS`,
  table_manners: (student) =>
    `Dear Parent/Guardian of ${student}, I noticed that ${student.split(" ")[0]} displayed wonderful table manners during lunch today — they were neat, patient, and considerate of others. These small habits reflect great upbringing. Appreciate them!\n\n— Acharya Sandipani, SWAIS`,
  general: (student) =>
    `Dear Parent/Guardian of ${student}, I wanted to share a quick update regarding ${student.split(" ")[0]}'s progress at school.\n\n— Acharya Sandipani, SWAIS`,
};

// ── Auto Test Generation — Static Demo Questions ─────────────────────────────

export const STATIC_TESTS = {
  "Chapter 1 — How, When and Where": {
    MCQ: [
      { id:1, question:"Who wrote the book 'The Discovery of India'?", options:["Mahatma Gandhi","Jawaharlal Nehru","Rabindranath Tagore","B.R. Ambedkar"], correct:"Jawaharlal Nehru", marks:2 },
      { id:2, question:"Which year is generally considered the beginning of 'Modern India' by historians?", options:["1757","1857","1947","1600"], correct:"1757", marks:2 },
      { id:3, question:"What does 'periodisation' of history mean?", options:["Writing history backwards","Dividing history into periods","Memorising historical dates","Recording oral history"], correct:"Dividing history into periods", marks:2 },
      { id:4, question:"The Census of India was first conducted in the year:", options:["1872","1901","1891","1881"], correct:"1872", marks:2 },
      { id:5, question:"Which of the following was NOT a source used by colonial historians?", options:["Administrative records","Diaries","Ancient Sanskrit texts","Oral traditions"], correct:"Oral traditions", marks:2 },
    ],
    "True/False": [
      { id:1, question:"James Mill divided Indian history into Hindu, Muslim and British periods.", correct:"True", marks:1 },
      { id:2, question:"Oral histories are considered less important than written records.", correct:"False", marks:1 },
      { id:3, question:"The British kept detailed records of all administrative activities.", correct:"True", marks:1 },
      { id:4, question:"Colonialism had no effect on how history was written in India.", correct:"False", marks:1 },
      { id:5, question:"Surveys were an important tool used by the British to know India better.", correct:"True", marks:1 },
    ],
    "Short Answer": [
      { id:1, question:"Why did the British preserve administrative records?", answer:"The British preserved administrative records to understand the territories they governed and to make administration more efficient.", marks:3 },
      { id:2, question:"What were the problems with James Mill's periodisation of Indian history?", answer:"Mill's periodisation was problematic because it was based on religion (Hindu, Muslim, British), ignored the rich diversity of Indian society, and was used to justify British rule.", marks:3 },
      { id:3, question:"How did historians come to know about the past?", answer:"Historians use a variety of sources — written records, oral traditions, diaries, letters, administrative documents, surveys, and archaeological finds.", marks:3 },
      { id:4, question:"What is meant by 'colonial' period in Indian history?", answer:"The colonial period refers to the time when India was under British rule — generally from the mid-18th century to 1947.", marks:3 },
      { id:5, question:"Why is 1757 considered an important year in Indian history?", answer:"1757 marked the Battle of Plassey, after which the British East India Company gained significant political control over Bengal, beginning the era of British colonial rule.", marks:3 },
    ],
  },
  "Chapter 3 — Ruling the Countryside": {
    MCQ: [
      { id:1, question:"Under the Permanent Settlement of 1793, who were given the rights over land?", options:["Farmers","Zamindars","British officers","Village heads"], correct:"Zamindars", marks:2 },
      { id:2, question:"The Mahalwari system was introduced in which region?", options:["Bengal","Madras","North-West provinces","Bombay"], correct:"North-West provinces", marks:2 },
      { id:3, question:"What was the main cash crop the British forced Indian farmers to grow?", options:["Rice","Wheat","Indigo","Cotton"], correct:"Indigo", marks:2 },
      { id:4, question:"The Ryotwari System collected revenue directly from:", options:["Zamindars","Village heads","Individual farmers (ryots)","British collectors"], correct:"Individual farmers (ryots)", marks:2 },
      { id:5, question:"The Blue Rebellion (Nil Bidroha) of 1859 was a revolt by farmers against:", options:["Zamindars","Indigo planters","British army","Tax collectors"], correct:"Indigo planters", marks:2 },
    ],
    "True/False": [
      { id:1, question:"The Permanent Settlement fixed the tax amount zamindars had to pay to the British.", correct:"True", marks:1 },
      { id:2, question:"Indigo was a luxury crop for Indian farmers.", correct:"False", marks:1 },
      { id:3, question:"Ryots were forced to grow indigo on at least 3/20 of their land.", correct:"True", marks:1 },
      { id:4, question:"The Mahalwari system gave land rights to individual farmers.", correct:"False", marks:1 },
      { id:5, question:"The indigo revolt of 1859 led to the formation of an Indigo Commission.", correct:"True", marks:1 },
    ],
    "Short Answer": [
      { id:1, question:"What were the problems faced by zamindars under the Permanent Settlement?", answer:"Zamindars had to pay a fixed amount of revenue even during bad harvests or floods. If they failed to pay, they lost their land. Many zamindars fell into debt.", marks:3 },
      { id:2, question:"Why were peasants unhappy with the indigo cultivation system?", answer:"Peasants were forced to grow indigo on their best land, were paid very low prices, and took advances that trapped them in debt. They had no freedom to grow food crops instead.", marks:3 },
      { id:3, question:"Explain the difference between the Permanent Settlement and Ryotwari system.", answer:"In the Permanent Settlement, revenue was collected from zamindars who owned large areas of land. In the Ryotwari system, revenue was collected directly from individual farmers (ryots) based on the land they cultivated.", marks:3 },
    ],
  },
  "Chapter 5 — When People Rebel": {
    MCQ: [
      { id:1, question:"The Revolt of 1857 began on:", options:["10 May 1857","1 January 1857","26 January 1857","15 August 1857"], correct:"10 May 1857", marks:2 },
      { id:2, question:"Who was the last Mughal emperor during the Revolt of 1857?", options:["Aurangzeb","Bahadur Shah Zafar","Shah Jahan","Akbar II"], correct:"Bahadur Shah Zafar", marks:2 },
      { id:3, question:"The greased cartridges that sparked the revolt were believed to contain fat of:", options:["Goat and sheep","Cow and pig","Horse and dog","Camel and buffalo"], correct:"Cow and pig", marks:2 },
      { id:4, question:"Rani Lakshmibai led the revolt from which princely state?", options:["Jhansi","Awadh","Bihar","Kanpur"], correct:"Jhansi", marks:2 },
      { id:5, question:"After the revolt of 1857, the British Crown took over power from:", options:["The Mughals","The East India Company","The Maratha Confederacy","The Nawabs"], correct:"The East India Company", marks:2 },
    ],
    "True/False": [
      { id:1, question:"The Revolt of 1857 is also called India's First War of Independence.", correct:"True", marks:1 },
      { id:2, question:"Mangal Pandey was a soldier in the Bengal Army.", correct:"True", marks:1 },
      { id:3, question:"All sections of Indian society participated equally in the 1857 revolt.", correct:"False", marks:1 },
      { id:4, question:"After 1857, the British decided to respect Indian religious practices.", correct:"True", marks:1 },
      { id:5, question:"Nana Sahib was the adopted son of Peshwa Baji Rao II.", correct:"True", marks:1 },
    ],
    "Short Answer": [
      { id:1, question:"What were the main causes of the Revolt of 1857?", answer:"The causes include: the greased cartridge issue, annexation of princely states under the Doctrine of Lapse, high taxes, disrespect for Indian traditions, fear of religious conversion, and economic exploitation by the British.", marks:3 },
      { id:2, question:"How did the British change their policies after 1857?", answer:"After 1857, the Crown took over from the Company, the British promised to respect Indian religious practices, titles and land rights were protected, and more Indians were recruited into the army alongside British soldiers.", marks:3 },
      { id:3, question:"Why did the Revolt of 1857 ultimately fail?", answer:"The revolt failed because it lacked unified leadership and coordination, many Indian rulers remained loyal to the British, the rebels were poorly equipped compared to the British, and the revolt did not spread across all of India.", marks:3 },
    ],
  },
};

// ── Reports Static Data ───────────────────────────────────────────────────────

export const GRADE_DISTRIBUTION = [
  { name: "A+ (90–100%)", value: 42, color: "#10B981" },
  { name: "A  (75–89%)",  value: 38, color: "#6366F1" },
  { name: "B  (60–74%)",  value: 28, color: "#8B5CF6" },
  { name: "C  (45–59%)",  value: 14, color: "#F59E0B" },
  { name: "D  (<45%)",    value: 8,  color: "#EF4444" },
];

export const GENDER_PERFORMANCE = [
  { name: "Male Students",   value: 74, color: "#6366F1" },
  { name: "Female Students", value: 81, color: "#EC4899" },
];

export const ASSESSMENT_COMPLETION = [
  { name: "Submitted",  value: 118, color: "#10B981" },
  { name: "Absent",     value: 12,  color: "#EF4444" },
];

export const CLASS_PERFORMANCE = [
  { name: "8A",  value: 78, color: "#6366F1" },
  { name: "8B",  value: 74, color: "#8B5CF6" },
  { name: "9A",  value: 82, color: "#06B6D4" },
  { name: "9B",  value: 71, color: "#F59E0B" },
];
