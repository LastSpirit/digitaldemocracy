import { useEffect } from 'react';
import type { FC } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import {
  RegisterAmplify,
} from '../../components/authentication/register';
import gtm from '../../lib/gtm';

const Register: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  return (
    <>
      <Card sx={{
        width: 555,
      }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '70px',
            paddingRight: '45px',
            paddingLeft: '45px'
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              mb="0"
              fontWeight="300"
            >
              Регистрация
            </Typography>
            <Box
              sx={{
                height: 32,
                '& > img': {
                  maxHeight: '100%',
                  width: 'auto'
                }
              }}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                fontWeight="300"
                variant="h4"
              >
                1/4
              </Typography>
            </Box>
          </Box>
          <Typography
            color="#747373"
            gutterBottom
          >
            Где вы имеете право голоса?
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3
            }}
          >
            <RegisterAmplify />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Прежде всего, синтетическое тестирование в значительной степени обусловливает важность прогресса профессионального сообщества!
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
