import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { TextInput } from './components/TextInput';
import { MessageLeft, MessageRight } from './components/Message';
import ContentLeft from './components/ContentLeft';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      // width: '80vw',
      // height: '80vh',
      // maxWidth: '500px',
      maxHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    paper2: {
      // width: '80vw',
      maxWidth: '500px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      // width: '75vw',
      // height: 'calc( 100vh - 80px )',
      height: '67vh',
      display: 'flex',
      alignItems: 'left',
    },
    messagesBody: {
      // width: 'calc( 100% - 20px )',
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 80px )',

      '&&::-webkit-scrollbar': {
        width: '5px',
      },

      '&&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
      },

      '&&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
      },
    },
    contenLeft: {
      width: '350px',
      overflowX: 'hidden',
      // height: 'calc( 100% - 80px )',
      overflow: 'scroll',

      '&&::-webkit-scrollbar': {
        width: '5px',
      },

      '&&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
      },

      '&&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
      },
    },
  }),
);

export default function App() {
  const classes = useStyles();
  return (
    <PageContainer title="Kênh chat" description="">
      <DashboardCard title="Tin nhắn của bạn">
        <div className={classes.container}>
          <div className={classes.contenLeft}>
            <ContentLeft />
          </div>
          <Paper className={classes.paper} zDepth={2}>
            <Paper id="style-1" className={classes.messagesBody}>
              <MessageLeft
                message="あめんぼあかいなあいうえお"
                timestamp="MM/DD 00:00"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName=""
                avatarDisp={true}
              />
              <MessageLeft
                message="xxxxxhttps://yahoo.co.jp xxxxxxxxxあめんぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさいすせそ"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="テスト"
                avatarDisp={false}
              />
              <MessageRight
                message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
                timestamp="MM/DD 00:00"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={true}
              />
              <MessageRight
                message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
                timestamp="MM/DD 00:00"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={false}
              />
            </Paper>
            <TextInput />
          </Paper>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
